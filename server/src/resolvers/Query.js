const version = () => "1.1.0";

const messages = async (_parent, _args, context, _info) => {
  const message = await context.prisma.message.findMany();

  return message;
};

module.exports = { messages, version };
