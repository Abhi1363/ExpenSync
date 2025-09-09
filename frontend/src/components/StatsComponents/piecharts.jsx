import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#00C49F', '#8884d8'];

const groupExpensesByCategory = (expenses = []) => {
  const grouped = {};
  expenses.forEach(({ description, amount }) => {
    if (!grouped[description]) grouped[description] = 0;
    grouped[description] += amount;
  });
  return Object.entries(grouped).map(([name, amount]) => ({ name, amount }));
};

const PieChartComponent = ({ expenses = []}) => {
  const data = groupExpensesByCategory(expenses);

  return (
     <div> <h2 style={{ color: "black", marginLeft:"20%" }}>Individual Expense</h2>
    <div className="flex justify-center" style={{border:"1px solid black", padding:"35px" }}>
      
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
          dataKey="amount"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      </div>
    </div>
  );
};

export default PieChartComponent;
