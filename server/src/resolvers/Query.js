const version = () => "1.1.0";

const messages = async (_parent, args, context, _info) => {
  const { filter, skip, take, orderBy } = args;

  const where = filter
    ? {
        content: filter,
      }
    : {};
  console.log(where);
  const messageList = await context.prisma.message.findMany({
    where,
    skip,
    take,
    orderBy,
  });
  const count = await context.prisma.message.count();

  return { messageList, count };
};

module.exports = { messages, version };
