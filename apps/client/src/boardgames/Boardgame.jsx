/* eslint-disable react/prop-types */
export default function Boardgame({ game }) {
  return (
    <table>
      <tr>
        <th>ID</th>
        <th>NAME</th>
      </tr>
      <tr>
        <td>{game.id}</td>
      </tr>
      <tr>
        <td>{game.name}</td>
      </tr>
    </table>
  );
}
