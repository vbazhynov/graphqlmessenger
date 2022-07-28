const createMessage = async (_parent, args, context) => {
  const createdMessage = await context.prisma.product.create({
    data: args.data,
  });
  context.pubsub.publish("NEW_MESSAGE", createdMessage);
  return createdMessage;
};

module.exports = { createMessage };
