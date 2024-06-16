import React, { useEffect, useState } from "react";
import { BoardModel } from "../BoardModel";
import { EntryData } from "../types/EntryData";
import { TextField, DefaultButton } from "@fluentui/react";
import { uuidv4 } from '../utils';
import './entry.component.css';
import { AzureMember } from "@fluidframework/azure-client";

export type EntriesProps = {
    model: BoardModel;
    author: AzureMember;
};

export function EntriesList(props: EntriesProps) {
    const { model } = props;
    const [columns, setColumns] = useState<{ id: string; entries: EntryData[] }[]>([]);

    const groupEntriesByColumn = (entries: EntryData[]) => {
        const columnsMap: { [key: string]: EntryData[] } = {};
        entries.forEach(entry => {
            const columnId = entry.position.x.toString();
            if (!columnsMap[columnId]) {
                columnsMap[columnId] = [];
            }
            columnsMap[columnId].push(entry);
        });
        return Object.keys(columnsMap).map(key => ({ id: key, entries: columnsMap[key] }));
    };

    const handleTextChange = (event: any, columnId: string, entryId: string) => {
        const newText = event.target.value;
        model.SetEntryContent(entryId, newText);
        setColumns(columns.map(column => {
            if (column.id === columnId) {
                return {
                    ...column,
                    entries: column.entries.map(entry => entry.id === entryId ? { ...entry, content: newText } : entry)
                };
            }
            return column;
        }));
    };

    const addNewEntry = (columnId: string) => {
        const id = uuidv4();
        const newEntry: EntryData = {
            id: id,
            position: {
                x: parseInt(columnId),
                y: columns.find(column => column.id === columnId)!.entries.length * 100 // Adjust positioning logic as needed
            },
            author: props.author,
            content: ""
        };
        model.SetEntry(id, newEntry);
        setColumns(columns.map(column => {
            if (column.id === columnId) {
                return {
                    ...column,
                    entries: [...column.entries, newEntry]
                };
            }
            return column;
        }));
    };

    const addNewColumn = () => {
        const newColumnId = (columns.length + 1).toString();
        const newColumns = [...columns, { id: newColumnId, entries: [] }];
        setColumns(newColumns);

    };
    const syncFluid = () => {
        const entries: EntryData[] = model.entries;
        const groupedEntries = groupEntriesByColumn(entries);
        setColumns(groupedEntries);
    };

    useEffect(() => {
        syncFluid();
        model.setChangeListener(syncFluid);
        return () => model.removeChangeListener(syncFluid);
    }, [model]);

    return (
        <div className="board-container">
            <div className="columns-container">
                {columns.map((column, columnIndex) => (
                    <div key={columnIndex} className="board-column">
                        {column.entries.map((entry, entryIndex) => (
                            <div key={entryIndex} className="board-entry">
                                <TextField
                                    styles={{ fieldGroup: { background: 'lightblue' } }}
                                    borderless
                                    multiline
                                    resizable={false}
                                    autoAdjustHeight
                                    onChange={(event) => handleTextChange(event, column.id, entry.id)}
                                    value={entry.content}
                                    placeholder={"Enter Text Here"}
                                />
                            </div>
                        ))}
                        <DefaultButton onClick={() => addNewEntry(column.id)} text="Add Entry" />
                    </div>
                ))}
                <DefaultButton onClick={addNewColumn} text="Add Column" className="add-column-button" />
            </div>
        </div>
    );
}