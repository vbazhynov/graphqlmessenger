const createMessage = async (_parent, args, context) => {
  const createdMessage = await context.prisma.message.create({
    data: args.data,
  });
  context.pubsub.publish("NEW_MESSAGE", createdMessage);
  return createdMessage;
};

const createResponse = async (_parent, args, context) => {
  const {
    response: { content, messageId },
  } = args;
  console.log("here");
  const isMessageExists = await context.prisma.message
    .findFirst({
      where: {
        id: messageId,
      },
      select: { id: true },
    })
    .then(Boolean);

  console.log(isMessageExists);

  if (!isMessageExists) {
    throw new Error(`Product with id ${messageId} does not exist`);
  }

  return context.prisma.response.create({
    data: {
      content,
      message: {
        connect: { id: messageId },
      },
    },
  });
};

module.exports = { createMessage, createResponse };
