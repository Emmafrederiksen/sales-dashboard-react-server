import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { supabase } from './lib/supabase'
import App from './App'

const app = express()
const PORT = 3001

app.get('/', async (req, res) => {
    // Hent data fra Supabase
    const result = await supabase
        .from('orders')
        .select(`
            id,
            amount,
            status,
            created_at,
            customers (name),
            products (name)
        `)
        .order('id', { ascending: false })
        .limit(8)

    const orders = result.data || []

    // Render React-komponenten til HTML på serveren 
    const html = renderToString(
        React.createElement(App, { orders })
    )

    // Send den færdige HTML til browseren
    res.send(`
        <!DOCTYPE html>
        <html lang="da">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Insight Dashboard – SSR</title>
            </head>
            <body>
                <div id="root">${html}</div>
            </body>
        </html>
    `)
})

app.listen(PORT, () => {
    console.log(`SSR server kører på http://localhost:${PORT}`)
})