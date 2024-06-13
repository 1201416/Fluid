import { IDomainEvent } from "./IDomainEvent";
import { AggregateRoot } from "../AggregateRoot";
import { UniqueEntityID } from "../UniqueEntityID";

type EventHandlersMap = {
  [key: string]: Array<(event: IDomainEvent) => void>;
};

export class DomainEvents {
  private static handlersMap: EventHandlersMap = {};
  private static markedAggregates: AggregateRoot<any>[] = [];

  public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: IDomainEvent) => this.dispatch(event));
  }

  private static removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<any>): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));
    if (index !== -1) {
      this.markedAggregates.splice(index, 1);
    }
  }

  private static findMarkedAggregateByID(id: UniqueEntityID): AggregateRoot<any> | null {
    for (let aggregate of this.markedAggregates) {
      if (aggregate.id.equals(id)) {
        return aggregate;
      }
    }
    return null;
  }

  public static dispatchEventsForAggregate(id: UniqueEntityID): void {
    const aggregate = this.findMarkedAggregateByID(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  public static register(callback: (event: IDomainEvent) => void, eventClassName: string): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
  }

  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  private static dispatch(event: IDomainEvent): void {
    const eventClassName: string = event.constructor.name;

    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: Array<(event: IDomainEvent) => void> = this.handlersMap[eventClassName];
      for (let handler of handlers) {
        handler(event);
      }
    }
  }
}