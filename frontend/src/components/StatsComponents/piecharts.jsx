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
  const legendData = data.map((entry, index) => ({
    value: entry.name,
    type: 'square',
    id: entry.id || index,
    color: COLORS[index % COLORS.length],
  }));

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(120px, 1fr))',
        gap: '12px 30px',
        justifyItems: 'start',
        marginTop: 6,
        width: '100%',
      }}>
        {payload.map((entry) => (
          <div key={entry.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', fontSize: '0.9rem', color: '#2a1c1c' }}>
            <span style={{ width: 14, height: 14, backgroundColor: entry.color, display: 'inline-block', borderRadius: 3 }} />
            <span>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 24px', width: '100%' }}>
      <PieChart width={620} height={480}>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          outerRadius={120}
          labelLine={false}
          label={({ name }) => name}
          dataKey="amount"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend content={renderLegend} payload={legendData} />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
