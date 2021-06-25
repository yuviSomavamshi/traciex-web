import React from "react";

import { Table, TableBody, TableCell, TableHead, TableContainer, TableRow } from "@material-ui/core";

export default class DataTable extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <>
        <div>
          <TableContainer>
            <div style={{ maxHeight: 250, overflowY: "auto", marginBottom: 20, marginTop: 20, padding: "0 20px" }}>
              <Table aria-label="">
                <TableHead>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Name
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      Count
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className=" pl-2" component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell className="pr-2" align="right">
                        {row.count}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TableContainer>
        </div>
      </>
    );
  }
}
