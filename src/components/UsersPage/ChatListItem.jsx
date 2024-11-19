const ChatListItem = ({ name, lastMessage, time, isSelected, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full p-4 flex items-center space-x-4 ${
        isSelected ? 'bg-red-50' : 'hover:bg-gray-50'
      }`}
    >
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
        {/* Example icon */}
        <User className="w-6 h-6 text-gray-500" />
      </div>
      <div className="flex-1 text-left">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-medium text-gray-900">{name}</h3>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
      </div>
    </button>
  );
  