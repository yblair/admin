import EmptyState from "../components/emptyState/EmptyState";

export const Messages = () => {
  return (
    <div>
      <EmptyState
        title="No new messages"
        description="There’s currently no new messages"
        image="/emptyMessages.svg"
      />
    </div>
  );
};
