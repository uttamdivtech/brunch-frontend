import MenuCard from './MenuCard';

const MenuList = ({ menuItems, onEdit, onDelete, showActions = true }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItems.map((item, index) => {
        return (
          <MenuCard
            key={item._id ? item?._id : index}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            showActions={showActions}
          />
        );
      })}
    </div>
  );
};

export default MenuList;
