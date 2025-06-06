import { useState } from 'react';
import {
  FiPlus, FiMoreVertical, FiBell, FiSearch, FiUser,
  FiHome, FiUsers, FiSettings, FiLogOut,
  FiChevronDown, FiChevronRight, FiStar, FiFolder,
  FiGrid, FiPieChart
} from 'react-icons/fi';

type Card = {
  id: string;
  title: string;
  description?: string;
  labels?: string[];
};

type Column = {
  id: string;
  title: string;
  cards: Card[];
};

type Group = {
  id: string;
  name: string;
  unread?: number;
  isExpanded?: boolean;
  channels?: {
    id: string;
    name: string;
    unread?: number;
  }[];
};

const MobileNavItem = ({ icon: Icon, label, badge, onClick }: { 
  icon: React.ComponentType<{ size: number }>;
  label: string;
  badge?: number;
  onClick: () => void;
}) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center flex-1 py-2 text-gray-600 hover:text-blue-600"
  >
    <div className="relative">
      <Icon size={20} />
      {badge && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </div>
    <span className="text-xs mt-1">{label}</span>
  </button>
);

const Dashboard = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: '1',
      title: 'To Do',
      cards: [
        {
          id: '1-1',
          title: 'Review monthly expenses',
          description: 'Check all transactions from last month',
          labels: ['finance']
        },
        {
          id: '1-2',
          title: 'Set budget for groceries',
          description: 'Allocate $300 for weekly groceries',
          labels: ['budget']
        }
      ]
    },
    {
      id: '2',
      title: 'In Progress',
      cards: [
        {
          id: '2-1',
          title: 'Track daily spending',
          description: 'Record all expenses in the app',
          labels: ['daily']
        }
      ]
    },
    {
      id: '3',
      title: 'Done',
      cards: [
        {
          id: '3-1',
          title: 'Setup expense categories',
          description: 'Created all necessary categories',
          labels: ['setup']
        }
      ]
    }
  ]);

  const [groups, setGroups] = useState<Group[]>([
    {
      id: 'g1',
      name: 'Finance Team',
      unread: 3,
      isExpanded: true,
      channels: [
        { id: 'c1', name: 'general', unread: 2 },
        { id: 'c2', name: 'reports' },
        { id: 'c3', name: 'budget-planning' }
      ]
    },
    {
      id: 'g2',
      name: 'Personal',
      isExpanded: false,
      channels: [
        { id: 'c4', name: 'expenses' },
        { id: 'c5', name: 'savings' }
      ]
    },
    {
      id: 'g3',
      name: 'Family Budget',
      unread: 1,
      isExpanded: false
    }
  ]);

  const [newCardText, setNewCardText] = useState('');
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState('board');

  const toggleGroup = (groupId: string) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return { ...group, isExpanded: !group.isExpanded };
      }
      return group;
    }));
  };

  const addCard = (columnId: string) => {
    if (!newCardText.trim()) return;
    
    setColumns(columns.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          cards: [
            ...column.cards,
            {
              id: `${columnId}-${Date.now()}`,
              title: newCardText.trim(),
              description: '',
              labels: []
            }
          ]
        };
      }
      return column;
    }));
    
    setNewCardText('');
    setActiveColumn(null);
  };

  const moveCard = (cardId: string, fromColumnId: string, toColumnId: string) => {
    if (fromColumnId === toColumnId) return;
    
    setColumns(columns => {
      const fromColumn = columns.find(col => col.id === fromColumnId);
      const toColumn = columns.find(col => col.id === toColumnId);
      
      if (!fromColumn || !toColumn) return columns;
      
      const card = fromColumn.cards.find(c => c.id === cardId);
      if (!card) return columns;
      
      return columns.map(column => {
        if (column.id === fromColumnId) {
          return {
            ...column,
            cards: column.cards.filter(c => c.id !== cardId)
          };
        }
        if (column.id === toColumnId) {
          return {
            ...column,
            cards: [...column.cards, card]
          };
        }
        return column;
      });
    });
  };

  const handleMobileNavClick = (tab: string, groupName?: string) => {
    setActiveMobileTab(tab);
    if (groupName) {
      alert(`Navigating to ${groupName}`);
    }
  };

  const activeGroups = groups.filter(group => group.unread || group.isExpanded);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className={`hidden md:flex bg-gray-800 text-white ${sidebarCollapsed ? 'w-16' : 'w-64'} flex-shrink-0 flex-col transition-all duration-200`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {!sidebarCollapsed && <h2 className="text-xl font-bold">Lutiexpense</h2>}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-gray-400 hover:text-white"
          >
            {sidebarCollapsed ? <FiChevronRight size={20} /> : <FiChevronDown size={20} />}
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto">
          <div className="p-2">
            <button className="w-full flex items-center p-2 rounded hover:bg-gray-700 text-sm font-medium">
              <FiHome className="mr-3" size={18} />
              {!sidebarCollapsed && <span>Dashboard</span>}
            </button>
            
            <button className="w-full flex items-center p-2 rounded hover:bg-gray-700 text-sm font-medium mt-1">
              <FiStar className="mr-3" size={18} />
              {!sidebarCollapsed && <span>Favorites</span>}
            </button>
            
            <button className="w-full flex items-center p-2 rounded hover:bg-gray-700 text-sm font-medium mt-1">
              <FiFolder className="mr-3" size={18} />
              {!sidebarCollapsed && <span>Projects</span>}
            </button>
          </div>
          
          <div className="border-t border-gray-700 pt-2">
            <div className="px-2 mb-1 flex items-center justify-between">
              {!sidebarCollapsed && <span className="text-xs font-semibold text-gray-400 uppercase">Groups</span>}
            </div>
            
            {groups.map(group => (
              <div key={group.id} className="mb-1">
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center justify-between p-2 rounded hover:bg-gray-700 text-sm"
                >
                  <div className="flex items-center">
                    <FiUsers className="mr-3" size={16} />
                    {!sidebarCollapsed && (
                      <>
                        <span>{group.name}</span>
                        {group.unread && (
                          <span className="ml-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            {group.unread}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  {!sidebarCollapsed && (group.isExpanded ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />)}
                </button>
                
                {group.isExpanded && group.channels && !sidebarCollapsed && (
                  <div className="ml-8 mt-1">
                    {group.channels.map(channel => (
                      <button
                        key={channel.id}
                        className="w-full flex items-center justify-between p-1.5 rounded hover:bg-gray-700 text-sm"
                      >
                        <span># {channel.name}</span>
                        {channel.unread && (
                          <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            {channel.unread}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <button className="w-full flex items-center p-2 rounded hover:bg-gray-700 text-sm mt-2">
              <FiPlus className="mr-3" size={18} />
              {!sidebarCollapsed && <span>Add Group</span>}
            </button>
          </div>
        </nav>
        
        <div className="p-2 border-t border-gray-700">
          <button className="w-full flex items-center p-2 rounded hover:bg-gray-700 text-sm">
            <FiSettings className="mr-3" size={18} />
            {!sidebarCollapsed && <span>Settings</span>}
          </button>
          
          <button className="w-full flex items-center p-2 rounded hover:bg-gray-700 text-sm mt-1">
            <FiLogOut className="mr-3" size={18} />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
          
          {!sidebarCollapsed && (
            <div className="flex items-center p-2 mt-2 text-xs text-gray-400">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                <FiUser size={16} />
              </div>
              <div>
                <div className="font-medium">John Doe</div>
                <div>Free Plan</div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar - Hidden on mobile */}
        <header className="hidden md:block bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Expense Board</h1>
            </div>
            
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full py-1.5 px-3 pl-8 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                />
                <FiSearch className="absolute left-2.5 top-2.5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-1.5 rounded-full hover:bg-gray-100 relative">
                <FiBell size={18} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                <FiUser size={16} />
              </div>
            </div>
          </div>
        </header>

        {/* Board Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50 pb-16 md:pb-4">
          {activeMobileTab === 'board' && (
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 min-h-full">
              {columns.map(column => (
                <div key={column.id} className="w-full md:w-72 flex-shrink-0">
                  <div className="bg-gray-200 rounded-lg p-2 h-full">
                    <div className="flex justify-between items-center p-2">
                      <h3 className="font-medium">{column.title}</h3>
                      <button className="text-gray-500 hover:text-gray-700">
                        <FiMoreVertical />
                      </button>
                    </div>
                    
                    <div className="space-y-2 mt-2">
                      {column.cards.map(card => (
                        <div
                          key={card.id}
                          draggable
                          onDragStart={e => {
                            e.dataTransfer.setData('cardId', card.id);
                            e.dataTransfer.setData('fromColumnId', column.id);
                          }}
                          onDragOver={e => e.preventDefault()}
                          onDrop={e => {
                            e.preventDefault();
                            const cardId = e.dataTransfer.getData('cardId');
                            const fromColumnId = e.dataTransfer.getData('fromColumnId');
                            moveCard(cardId, fromColumnId, column.id);
                          }}
                          className="bg-white p-3 rounded shadow-sm hover:shadow-md transition cursor-pointer"
                        >
                          <h4 className="font-medium">{card.title}</h4>
                          {card.description && (
                            <p className="text-sm text-gray-600 mt-1">{card.description}</p>
                          )}
                          {card.labels && card.labels.length > 0 && (
                            <div className="flex flex-wrap mt-2 gap-1">
                              {card.labels.map((label, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800"
                                >
                                  {label}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {activeColumn === column.id ? (
                      <div className="mt-2">
                        <textarea
                          value={newCardText}
                          onChange={e => setNewCardText(e.target.value)}
                          placeholder="Enter a title for this card..."
                          className="w-full p-2 border rounded shadow-inner resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                          autoFocus
                          rows={3}
                        />
                        <div className="flex mt-2 space-x-2">
                          <button
                            onClick={() => addCard(column.id)}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Add Card
                          </button>
                          <button
                            onClick={() => setActiveColumn(null)}
                            className="px-3 py-1 text-gray-600 hover:text-gray-800"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveColumn(column.id)}
                        className="w-full mt-2 p-2 text-gray-600 hover:bg-gray-300 rounded flex items-center justify-start"
                      >
                        <FiPlus className="mr-1" />
                        <span>Add a card</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="w-full md:w-72 flex-shrink-0">
                <button
                  onClick={() => {
                    const newColumn = {
                      id: Date.now().toString(),
                      title: 'New Column',
                      cards: []
                    };
                    setColumns([...columns, newColumn]);
                  }}
                  className="w-full p-3 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-start"
                >
                  <FiPlus className="mr-1" />
                  <span>Add another column</span>
                </button>
              </div>
            </div>
          )}

          {activeMobileTab === 'groups' && (
            <div className="md:hidden p-4">
              <h2 className="text-xl font-semibold mb-4">Your Groups</h2>
              {activeGroups.length > 0 ? (
                <div className="space-y-3">
                  {activeGroups.map(group => (
                    <button
                      key={group.id}
                      onClick={() => handleMobileNavClick('group', group.name)}
                      className="w-full p-4 bg-white rounded-lg shadow-sm flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <FiUsers className="text-gray-500 mr-3" size={20} />
                        <span className="font-medium">{group.name}</span>
                      </div>
                      {group.unread && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          {group.unread}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FiUsers size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No groups yet. Start by creating one!</p>
                  <button
                    onClick={() => alert('Create new group')}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Create Group
                  </button>
                </div>
              )}
            </div>
          )}

          {activeMobileTab === 'stats' && (
            <div className="md:hidden p-4">
              <h2 className="text-xl font-semibold mb-4">Statistics</h2>
              {/* Add your statistics content here */}
            </div>
          )}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center px-2">
          <MobileNavItem
            icon={FiGrid}
            label="Board"
            onClick={() => handleMobileNavClick('board')}
          />
          <MobileNavItem
            icon={FiUsers}
            label="Groups"
            badge={activeGroups.reduce((acc, group) => acc + (group.unread || 0), 0)}
            onClick={() => handleMobileNavClick('groups')}
          />
          <MobileNavItem
            icon={FiPieChart}
            label="Stats"
            onClick={() => handleMobileNavClick('stats')}
          />
          <MobileNavItem
            icon={FiUser}
            label="Profile"
            onClick={() => handleMobileNavClick('profile')}
          />
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;