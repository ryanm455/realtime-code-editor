import type { Prisma, User, Room, Node, Document } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        RelationName: "editingFiles" | "createdRooms" | "lastModifiedFiles" | "joinedRooms";
        ListRelations: "editingFiles" | "createdRooms" | "lastModifiedFiles" | "joinedRooms";
        Relations: {
            editingFiles: {
                Shape: Document[];
                Types: PrismaTypes["Document"];
            };
            createdRooms: {
                Shape: Room[];
                Types: PrismaTypes["Room"];
            };
            lastModifiedFiles: {
                Shape: Document[];
                Types: PrismaTypes["Document"];
            };
            joinedRooms: {
                Shape: Room[];
                Types: PrismaTypes["Room"];
            };
        };
    };
    Room: {
        Name: "Room";
        Shape: Room;
        Include: Prisma.RoomInclude;
        Select: Prisma.RoomSelect;
        OrderBy: Prisma.RoomOrderByWithRelationInput;
        WhereUnique: Prisma.RoomWhereUniqueInput;
        Where: Prisma.RoomWhereInput;
        RelationName: "nodes" | "creator" | "users";
        ListRelations: "nodes" | "users";
        Relations: {
            nodes: {
                Shape: Node[];
                Types: PrismaTypes["Node"];
            };
            creator: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            users: {
                Shape: User[];
                Types: PrismaTypes["User"];
            };
        };
    };
    Node: {
        Name: "Node";
        Shape: Node;
        Include: Prisma.NodeInclude;
        Select: Prisma.NodeSelect;
        OrderBy: Prisma.NodeOrderByWithRelationInput;
        WhereUnique: Prisma.NodeWhereUniqueInput;
        Where: Prisma.NodeWhereInput;
        RelationName: "room" | "parent" | "children" | "file";
        ListRelations: "children";
        Relations: {
            room: {
                Shape: Room;
                Types: PrismaTypes["Room"];
            };
            parent: {
                Shape: Node | null;
                Types: PrismaTypes["Node"];
            };
            children: {
                Shape: Node[];
                Types: PrismaTypes["Node"];
            };
            file: {
                Shape: Document | null;
                Types: PrismaTypes["Document"];
            };
        };
    };
    Document: {
        Name: "Document";
        Shape: Document;
        Include: Prisma.DocumentInclude;
        Select: Prisma.DocumentSelect;
        OrderBy: Prisma.DocumentOrderByWithRelationInput;
        WhereUnique: Prisma.DocumentWhereUniqueInput;
        Where: Prisma.DocumentWhereInput;
        RelationName: "node" | "lastModifiedBy" | "editors";
        ListRelations: "editors";
        Relations: {
            node: {
                Shape: Node | null;
                Types: PrismaTypes["Node"];
            };
            lastModifiedBy: {
                Shape: User | null;
                Types: PrismaTypes["User"];
            };
            editors: {
                Shape: User[];
                Types: PrismaTypes["User"];
            };
        };
    };
}