import { IStyle, mergeStyles, ThemeProvider } from "@fluentui/react";
import { AzureMember } from "@fluidframework/azure-client";
import React, {useEffect, useRef} from "react";
import { BoardModel } from "../BoardModel";
import { EntryData, Position } from "../types/EntryData";
import { useDrop } from "react-dnd"
import { lightTheme } from "../Themes";
import { Entry } from "./Entry";

export type EntryProps = Readonly<{
  model: BoardModel;
  author: AzureMember;
}>;

export function EntrySpace(props: EntryProps) {
  const { model } = props;
  const [entries, setEntries] = React.useState<readonly EntryData[]>([]);


  useEffect(() => {
    const syncLocalAndFluidState = () => {
      const entryData: EntryData[] = [];
      const ids: string[] = model.entryIds;
      for (let entryId of ids) {
        const newCardData: EntryData = model.CreateEntry(entryId, props.author);
        entryData.push(newCardData);
      }

      setEntries(entryData);
    }
    syncLocalAndFluidState();
    model.setChangeListener(syncLocalAndFluidState);
    return () => model.removeChangeListener(syncLocalAndFluidState);
  }, [model]);

  const rootStyle: IStyle = {
    flexGrow: 1,
    position: "relative",
    margin: "10px",
    borderRadius: "2px",
  };

  const spaceClass = mergeStyles(rootStyle);

  const [, drop] = useDrop(() => ({
    accept: 'entry',
    drop(item: any, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()!;
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      model.MoveEntry(item.id, {
        x: left > 0 ? left : 0,
        y: top > 0 ? top: 0
        
      }
      )
      return undefined;
    },
  }), [model]);
  
  const dropRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current);
    }
  }, [drop]);

  return (
    <div id="Entry" ref={dropRef} className={spaceClass}>
      <ThemeProvider theme={lightTheme}>
        {entries.map((entry) => {
          const setPosition = (position: Position) => {
            model.MoveEntry(entry.id, position);
          };

          const setText = (text: string) => {
            model.SetEntryContent(entry.id, text);
          };

          const onDelete = () => {
            model.DeleteEntry(entry.id);
          };

          return (
            <Entry
              {...entry}
              id={entry.id}
              key={entry.id}
              user={props.author}
              setPosition={setPosition}
              onDelete={onDelete}
              setText={setText}
            />
          );
        })}
      </ThemeProvider>
    </div>
  );
}