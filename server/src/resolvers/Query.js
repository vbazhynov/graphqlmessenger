const version = () => "1.1.0";

const messages = async (_parent, _args, context, _info) => {
  const messages = await context.prisma.message.findMany();

  return messages;
};

module.exports = { messages, version };
