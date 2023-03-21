import { TableCell, TableHead, TableRow } from "@mui/material"

const ProductListTableHead = () => {

  const headStyle = { fontWeight: 600 }
  const borderStyle = { border: '1px solid #e0e0e0' }

  const headCells = [
    { name: "title", label: "Title" },
    { name: "description", label: "Description" },
    { name: "price", label: "Price" },
    { name: "product_image", label: "Photo" },
    { name: "action", label: "Action" },
  ]


  return (
    <TableHead sx={borderStyle}>
      <TableRow>
        {
          headCells.map((headCell, index) => (
            <TableCell
              key={index}
              sx={headStyle}
              align="center"
            >
              {headCell.label}
            </TableCell>
          ))
        }
      </TableRow>
    </TableHead>
  )
}

export default ProductListTableHead