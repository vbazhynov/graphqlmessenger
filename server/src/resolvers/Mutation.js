const isMessageExists = async (context, id) =>
  await context.prisma.message
    .findFirst({
      where: {
        id: id,
      },
      select: { id: true },
    })
    .then(Boolean);

const createMessage = async (_parent, args, context) => {
  console.log(args.data);
  const createdMessage = await context.prisma.message.create({
    data: args.data,
  });
  context.pubsub.publish("NEW_MESSAGE", createdMessage);
  return createdMessage;
};

const createResponse = async (_parent, args, context) => {
  const {
    data: { content, messageId },
  } = args;
  if (!(await isMessageExists(context, id))) {
    console.error(`Message with id ${messageId} does not exist`);
    throw new Error(`Message with id ${messageId} does not exist`);
  }
  return await context.prisma.response.create({
    data: {
      content,
      message: {
        connect: { id: messageId },
      },
    },
  });
};

const likeMessage = async (_parent, args, context) => {
  const { id } = args;
  console.log(id);
  if (!(await isMessageExists(context, id))) {
    console.error(`Message with id ${messageId} does not exist`);
    throw new Error(`Message with id ${messageId} does not exist`);
  }
  return await context.prisma.message.update({
    where: { id: id },
    data: {
      likes: { increment: 1 },
    },
  });
};

const dislikeMessage = async (_parent, args, context) => {
  const { id } = args;
  if (!(await isMessageExists(context, id))) {
    console.error(`Message with id ${messageId} does not exist`);
    throw new Error(`Message with id ${messageId} does not exist`);
  }
  return await context.prisma.message.update({
    where: { id: id },
    data: {
      dislike: { increment: 1 },
    },
  });
};

module.exports = {
  createMessage,
  createResponse,
  likeMessage,
  dislikeMessage,
};
