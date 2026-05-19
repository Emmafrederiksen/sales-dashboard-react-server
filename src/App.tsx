import React from "react";

interface Order {
    id: number;
    amount: number;
    status: string;
    created_at: string;
    customers: {
        name: string;
    } [] | null;
    products: {
        name: string;
    } [] | null;
}

interface AppProps {
    orders: Order[];
}

export default function App({ orders }: AppProps) {
    return (
        <div>
            <h1>Insight Dashboard – SSR</h1>
            <p>Data hentet på serveren via Express og renderToString</p>
            <table>
                <thead>
                    <tr>
                        <th>Ordre</th>
                        <th>Kunde</th>
                        <th>Produkt</th>
                        <th>Beløb</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.customers?.[0]?.name}</td>
                            <td>{order.products?.[0]?.name}</td>
                            <td>{order.amount.toLocaleString('da-DK')} kr</td>
                            <td>{order.status === 'completed' ? 'Gennemført' : 'Afventer'}</td>
                        </tr>
                    ))}
                </tbody>    
            </table>                        
        </div>
    )
}    