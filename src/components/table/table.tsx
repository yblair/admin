import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./table.module.css";
import { Status } from "../status/status";

export type ProductStatusProps = "Approved" | "Pending" | "Rejected";

export type ProductProps = {
  id: number;
  customer: string;
  date: string;
  product: string;
  status: ProductStatusProps;
  email: string;
  amount: string;
  paymentMethod: string;
};

type Props = {
  data: ProductProps[];
};

const defaultColumns: ColumnDef<ProductProps>[] = [
  {
    header: "Customer",
    accessorKey: "customer",
    cell: ({ row }) => (
      <div>
        <div className={styles.customer}>{row.original.customer}</div>
        <div className={styles.email}>{row.original.email}</div>
      </div>
    ),
  },
  {
    header: "Date",
    accessorKey: "date",
  },
  {
    header: "Product",
    accessorKey: "product",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => <Status status={row.original.status} />,
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ row }) => (
      <div className={styles.amount}>{row.original.amount}</div>
    ),
  },
];

export const Table = ({ data }: Props) => {
  const [columns] = React.useState(() => [...defaultColumns]);

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <div className={styles.tableContainer}>
      <h2>Transactions</h2>
      <p>Recent transactions from your store.</p>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    className={styles.tableTitle}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        </table>
        <div className={styles.tableBody}>
          <table className={styles.table}>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.tableRow}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
