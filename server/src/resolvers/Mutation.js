const createMessage = async (_parent, args, context) => {
  const createdMessage = await context.prisma.message.create({
    data: args.data,
  });
  context.pubsub.publish("NEW_MESSAGE", createdMessage);
  return createdMessage;
};

const createResponse = async (_parent, args, context) => {
  const { content, messageId } = args;

  const isMessageExists = await context.prisma.message
    .findFirst({
      where: {
        id: messageId,
      },
      select: { id: true },
    })
    .then(Boolean);

  if (!isMessageExists) {
    throw new Error(`Product with id ${messageId} does not exist`);
  }

  const answer = await context.prisma.response.create({
    data: {
      content,
      Message: {
        connect: { id: messageId },
      },
    },
  });

  console.log(answer);

  return answer;
};

module.exports = { createMessage, createResponse };
