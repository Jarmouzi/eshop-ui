const { STATICS_Domain } = process.env;

const imageLoader = ({ src, width, height }) => {
  return `${STATICS_Domain || "https://localhost:7029/"}Statistics?path=${src}&width=${width || -1}&height=${height || -1}`;
};

module.exports = imageLoader;
