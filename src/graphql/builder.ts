import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { Prisma } from "@prisma/client";
import { prisma } from "@/prisma/client";
import { Context } from "@/app/graphql/route";
import PrismaTypes from "@/prisma/pothos-types";

export const builder = new SchemaBuilder<{
  Context: Context;
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
    dmmf: Prisma.dmmf,
  },
});
