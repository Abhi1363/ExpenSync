import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#00C49F', '#8884d8'];

// Show each individual expense as its own slice (use description or id as label)
const mapIndividualExpenses = (expenses = []) => {
  return expenses
    .filter((e) => Number(e.amount) && Number(e.amount) > 0)
    .map((e) => ({
      name: e.description || e._id || 'Expense',
      amount: Number(e.amount || 0),
      id: e._id,
    }));
};

const PieChartComponent = ({ expenses = [] }) => {
  const data = mapIndividualExpenses(expenses);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
      <PieChart width={400} height={300}>
        <Pie data={data} cx="50%" cy="50%" outerRadius={100} label dataKey="amount">
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
