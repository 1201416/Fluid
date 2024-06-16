import { AzureMember } from "@fluidframework/azure-client";
import { useDrag } from "react-dnd";
import { EntryData, Position } from "../types/EntryData";
import { EntryBody } from "./EntryBody";
  
  
export type EntryProps = Readonly<{
    id: string;
    user: AzureMember;
    setPosition: (position: Position) => void;
    onDelete: () => void;
    setText: (text: string) => void;
  }> &
    Pick<
      EntryData,
      | "id"
      | "position"
      | "content"
      | "author"
    >;
  
  export function Entry(props: EntryProps) {
    const {
      id,
      position: {x: left, y:top},
      setText,
      content
    } = props;
    
    const [, drag] = useDrag(
      () => ({
        type: "note",
        item: { id, left, top },
      }),
      [id, left, top]
    );

    return (
      <div className='root-class' ref={drag} style={{ left, top}}>
        <EntryBody setText={setText} content={content}/>
      </div>
    );
  }