const response = (parent, _args, context, _info) =>
  context.prisma.message.findUnique({ where: { id: parent.id } }).response();

module.exports = { response };
