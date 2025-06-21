import EmptyState from "../components/emptyState/EmptyState";

export const Orders = () => {
  return (
    <div>
      <EmptyState
        title="No orders yet"
        description="There’s currently no orders placed "
        image="/emptyState.svg"
      />
    </div>
  );
};
