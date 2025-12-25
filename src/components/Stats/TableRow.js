import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({
  label, link, value, format = (x) => x,
}) => (
  <tr>
    <td width="70%">{label}</td>
    <td>{link ? <a className="mail-link-new" href={link}>{format(value)}</a> : format(value)}</td>
  </tr>
);

TableRow.propTypes = {
  format: PropTypes.func,
  label: PropTypes.string.isRequired,
  link: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default TableRow;
