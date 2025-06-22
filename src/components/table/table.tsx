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
import Drawer from "../drawer/drawer";
import type { Status as StatusType } from "../../constants/status";

export type ProductProps = {
  id: number;
  customer: string;
  date: string;
  product: string;
  status: StatusType;
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
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [drawerContent, setDrawerContent] = React.useState<ProductProps | null>(
    null
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [focusedRowRef, setFocusedRowRef] = React.useState<HTMLElement | null>(
    null
  );

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

  const transactionForDrawer = drawerContent
    ? {
        ...drawerContent,
        amount: parseFloat(drawerContent.amount.replace("$", "")),
      }
    : null;

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      if (focusedRowRef) {
        focusedRowRef.focus();
      }
    }, 100);
  };

  const handleRowFocus = (element: HTMLElement) => {
    setFocusedRowRef(element);
  };

  return (
    <div className={styles.tableContainer}>
      <h2>Transactions</h2>
      <p>Recent transactions from your store.</p>

      {/* Desktop Table */}
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
        <div className={styles.tableBody} tabIndex={0}>
          <table className={styles.table}>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  tabIndex={0}
                  onFocus={(e) => handleRowFocus(e.currentTarget)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setDrawerContent(row.original);
                      setIsDrawerOpen(true);
                    }
                  }}
                  onClick={() => {
                    setDrawerContent(row.original);
                    setIsDrawerOpen(true);
                  }}
                >
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

      {/* Mobile Cards */}
      <div className={styles.mobileCards}>
        {table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            className={styles.mobileCard}
            tabIndex={0}
            onFocus={(e) => handleRowFocus(e.currentTarget)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setDrawerContent(row.original);
                setIsDrawerOpen(true);
              }
            }}
            onClick={() => {
              setDrawerContent(row.original);
              setIsDrawerOpen(true);
            }}
          >
            <div className={styles.mobileCardHeader}>
              <div className={styles.mobileCardCustomer}>
                <div className={styles.customer}>{row.original.customer}</div>
                <div className={styles.mobileCardEmail}>
                  {row.original.email}
                </div>
              </div>
              <div className={styles.mobileCardStatus}>
                <Status status={row.original.status} />
              </div>
            </div>
            <div className={styles.mobileCardDetails}>
              <div className={styles.mobileCardRow}>
                <span className={styles.mobileCardLabel}>Date</span>
                <span className={styles.mobileCardValue}>
                  {row.original.date}
                </span>
              </div>
              <div className={styles.mobileCardRow}>
                <span className={styles.mobileCardLabel}>Product</span>
                <span className={styles.mobileCardValue}>
                  {row.original.product}
                </span>
              </div>
              <div className={styles.mobileCardRow}>
                <span className={styles.mobileCardLabel}>Amount</span>
                <span className={styles.mobileCardAmount}>
                  {row.original.amount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        transaction={transactionForDrawer}
      />
    </div>
  );
};
