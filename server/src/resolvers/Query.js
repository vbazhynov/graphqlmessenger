const version = () => "1.1.0";

const products = (_parent, _args, _context, _info) => {
  const products = [
    {
      id: "1",
      title: "Banana",
      price: 23.5,
    },
    {
      id: "2",
      title: "Apple",
      price: 3.25,
    },
  ];

  return products;
};

module.exports = { products, version };
