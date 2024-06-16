import React, { useEffect, useState, useCallback } from 'react';
import { AzureContainerServices } from "@fluidframework/azure-client";
import { IFluidContainer } from "fluid-framework";
import { BoardModel, createBoardModel } from '../BoardModel';
import { EntriesList } from '../entry/EntriesList.component';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Header } from './Header';
import { EntryData } from '../types/EntryData';
import { useParams, useLocation } from 'react-router-dom';
interface BoardOpenedComponentProps {
  container: IFluidContainer;
  services: AzureContainerServices;
  id: string;
  name: string;
}

const BoardOpenedComponent: React.FC<BoardOpenedComponentProps> = (props: { container: IFluidContainer, services: AzureContainerServices, id: string, name: string }) => {
  const { container, services, name } = props;
  const [model, setModel] = useState<BoardModel>(() => {
    return createBoardModel(container);
  });
  const audience = services.audience;
  const [members, setMembers] = useState(Array.from(audience.getMembers().values()));
  const authorInfo = audience.getMyself();
  const location = useLocation();
  const { title } = location.state as { title: string };
  const setMembersCallback = useCallback(() => setMembers(
    Array.from(
      audience.getMembers().values()
    )
  ), [setMembers, audience]);

  useEffect(() => {
    container.on("connected", setMembersCallback);
    audience.on("membersChanged", setMembersCallback);
    container.on("disconnected", setMembersCallback);

    setMembersCallback();
    return () => {
      container.off("connected", setMembersCallback);
      audience.off("membersChanged", setMembersCallback);
      container.off("disconnected", setMembersCallback)
    };
  }, [container, audience, setMembersCallback]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMembersCallback();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setMembersCallback]);

  useEffect(() => {
    const handleValueChanged = () => {
      const modelo = model.entryIds;
      if (modelo.length === 0) {
        const entry: EntryData = {
          id: "asduhasdhashdu",
          author: authorInfo!,
          position: {
            x: 1,
            y: 2
          },
          content: "Initial Content"
        };
        model.SetEntry("asduashduah", entry);
      }
    };

    model.setChangeListener(handleValueChanged);
    return () => {
      model.removeChangeListener(handleValueChanged);
    };
  }, [model, authorInfo]);

  return (
    <div>
      <h1>{title}</h1>
      <Header
        model={model}
        author={authorInfo!}
        members={members}
      />
      <div className='items-list'>
        <DndProvider backend={HTML5Backend}>
          <EntriesList model={model} author={authorInfo!} />
        </DndProvider>
      </div>
    </div>
  );
};

export default BoardOpenedComponent;