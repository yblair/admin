import React, { useState, useMemo, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  Column,
} from "@tanstack/react-table";
import styles from "./table.module.css";
import { Status } from "../status/status";
import Drawer from "../drawer/drawer";
import { Search } from "../input/Search";
import type { Status as StatusType } from "../../constants/status";
import EmptyState from "../emptyState/EmptyState";
import TableSkeleton from "./tableSkeleton";
import TruncatedText from "../truncatedText/truncatedText";
import CardSkeleton from "./cardSkeleton";

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

const SortableHeader = ({
  column,
  children,
}: {
  column: Column<ProductProps>;
  children: React.ReactNode;
}) => (
  <div>
    {children}
    <span className={styles.sortArrow}>
      {column.getIsSorted() === "asc"
        ? "▲"
        : column.getIsSorted() === "desc"
        ? "▼"
        : ""}
    </span>
  </div>
);

const defaultColumns: ColumnDef<ProductProps>[] = [
  {
    header: ({ column }) => (
      <SortableHeader column={column}>Customer</SortableHeader>
    ),
    accessorKey: "customer",
    cell: ({ row }) => (
      <div>
        <div className={styles.customer}>{row.original.customer}</div>
        <div className={styles.email}>
          <TruncatedText text={row.original.email} />
        </div>
      </div>
    ),
  },
  {
    header: ({ column }) => (
      <SortableHeader column={column}>Date</SortableHeader>
    ),
    accessorKey: "date",
  },
  {
    header: ({ column }) => (
      <SortableHeader column={column}>Product</SortableHeader>
    ),
    accessorKey: "product",
  },
  {
    header: ({ column }) => (
      <SortableHeader column={column}>Status</SortableHeader>
    ),
    accessorKey: "status",
    cell: ({ row }) => <Status status={row.original.status} isDrawer={false} />,
  },
  {
    header: ({ column }) => (
      <SortableHeader column={column}>Amount</SortableHeader>
    ),
    accessorKey: "amount",
    cell: ({ row }) => (
      <div className={styles.amount}>{row.original.amount}</div>
    ),
  },
];

export const Table = ({ data }: Props) => {
  const [columns] = useState(() => [...defaultColumns]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<ProductProps | null>(null);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "date", desc: false },
  ]);
  const [focusedRowRef, setFocusedRowRef] = useState<HTMLElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1250);
    return () => clearTimeout(timer);
  }, []);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    return data.filter((item) =>
      item.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSorting: true,
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
      <div className={styles.tableContainerHeader}>
        <div className={styles.tableContainerHeaderLeft}>
          <h2>Transactions</h2>
          <p>Recent transactions from your store.</p>
        </div>
        <Search value={searchTerm} onChange={setSearchTerm} />
      </div>

      {filteredData.length === 0 && searchTerm.trim() !== "" ? (
        <EmptyState
          title="No customers found"
          description={`No customers match "${searchTerm}". Try adjusting your search terms.`}
        />
      ) : (
        <>
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
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const toggleHandler =
                              header.column.getToggleSortingHandler();
                            if (toggleHandler) {
                              toggleHandler(e);
                            }
                          }
                        }}
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
              <tbody className={styles.tableBody} tabIndex={0}>
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
                    {loading ? (
                      <TableSkeleton />
                    ) : (
                      row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className={styles.tableRow}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
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
                {loading ? (
                  <CardSkeleton />
                ) : (
                  <>
                    <div className={styles.mobileCardHeader}>
                      <div className={styles.mobileCardCustomer}>
                        <div className={styles.customer}>
                          {row.original.customer}
                        </div>
                      </div>

                      <div className={styles.mobileCardStatus}>
                        <Status status={row.original.status} isDrawer={false} />
                      </div>
                    </div>
                    <div className={styles.mobileCardEmail}>
                      <TruncatedText text={row.original.email} />
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
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        transaction={transactionForDrawer}
      />
    </div>
  );
};
