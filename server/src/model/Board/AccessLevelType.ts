import { AccessLevel } from "./AccessLevel";

export class AccessLevelType {
    private constructor() {
        throw new Error("Utility class cannot be instantiated");
    }

    static get WRITE(): AccessLevel {
        return AccessLevel.create("WRITE").getValue();
    }

    static get READ(): AccessLevel {
        return AccessLevel.create("READ").getValue();
    }

    static allAccessLevelTypes(): AccessLevel[] {
        return [AccessLevelType.WRITE, AccessLevelType.READ];
    }
}