import { IFluidContainer, ISharedMap, SharedMap } from "fluid-framework";
import { AzureMember } from "@fluidframework/azure-client";
import { EntryData, Position } from "./types/EntryData";

const c_entryIdPrefix = "entryId_";
const c_positionPrefix = "position_";
const c_TextPrefix = "text_";
const c_authorPrefix = "author_"

export type BoardModel = Readonly<{
  CreateEntry(entryId: string, author: AzureMember): EntryData;
  MoveEntry(entryId: string, position: Position): void;
  SetEntry(entryId: string, newCardData: EntryData): void;
  SetEntryContent(entryId: string, entryText: string): void;
  DeleteEntry(entryId: string): void;
  entryIds: string[];
  entries: EntryData[];
  setChangeListener(listener: () => void): void;
  removeChangeListener(listener: () => void): void;
}>;

export function createBoardModel(fluid: IFluidContainer): BoardModel {
  const sharedMap: ISharedMap = fluid.initialObjects.entries as SharedMap;
  
  const IsDeletedEntry = (entryId: string) => {
    return sharedMap.get(c_entryIdPrefix + entryId) === 0;
  };

  const SetEntryContent = (entryId: string, EntryText: string) => {
    sharedMap.set(c_TextPrefix + entryId, EntryText);
  };

  return {
    CreateEntry(entryId: string, author: AzureMember): EntryData {
      const newEntry: EntryData = {
        id: entryId,
        position: sharedMap.get(c_positionPrefix + entryId)!,
        content: sharedMap.get(c_TextPrefix + entryId),
        author: sharedMap.get(c_authorPrefix+entryId)!
      };
      return newEntry;
    },

    MoveEntry(entryId: string, newPos: Position) {
      sharedMap.set(c_positionPrefix + entryId, newPos);
    },
    

    SetEntry(entryId: string, newCardData: EntryData) {
      sharedMap.set(c_entryIdPrefix + entryId, 1);
      sharedMap.set(c_positionPrefix+entryId, newCardData.position)
      sharedMap.set(c_authorPrefix+entryId, newCardData.author);
      if (newCardData.content !== undefined && newCardData.content !==null) {
        SetEntryContent(newCardData.id, newCardData.content);
      } else {
        SetEntryContent(newCardData.id, "");
      }
    },

    SetEntryContent,

    DeleteEntry(entryId: string) {
      sharedMap.set(c_entryIdPrefix + entryId, 0);
    },

    get entryIds(): string[] {
      return (
        Array.from(sharedMap
          .keys())
          .filter((key: String) => key.includes(c_entryIdPrefix))
          .map((entryIdWithPrefix) =>
            entryIdWithPrefix.substring(c_entryIdPrefix.length)
          )
          .filter((entryId) =>  !IsDeletedEntry(entryId))
      );
    },

    get entries(): EntryData[] {
        return(
            Array.from(sharedMap.keys())
            .filter((key: string) => key.includes(c_entryIdPrefix))
            .map((idWithPrefix) =>
                idWithPrefix.substring(c_entryIdPrefix.length)
            )
            .filter((entryId) =>
                !IsDeletedEntry(entryId) && sharedMap.get(c_TextPrefix + entryId)
            ).map((id) =>{
                const position = sharedMap.get(c_positionPrefix + id)
                const content = sharedMap.get(c_TextPrefix + id)
                const author = sharedMap.get(c_authorPrefix + id)

                return{
                    id,
                    position,
                    content,
                    author
                };
            })
        )
    },

    setChangeListener(listener: () => void): void {
      sharedMap.on("valueChanged", listener);
    },

    removeChangeListener(listener: () => void): void {
      sharedMap.off("valueChanged", listener);
    }
  };
}