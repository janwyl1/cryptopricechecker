import React, { useState } from 'react';


/** 
  Table Component
*/
export function Table(props) {
    const [sortBy, setSortBy] = useState({field:'marketCapitalization', desc: 1});

    /* Toggle Asc/Desc state. Get id from <th> element and remove tbl- prefix */
    function handleSortByClick(e) {
      e.preventDefault();
      setSortBy({ field: e.target.id.substring(4), desc: 1 - sortBy.desc })
    }
    /* Determine which function to use for sorting currencies */
    function sortByFunc() {
        switch (sortBy.field) {
            case 'name':
            case 'ticker':
                if (sortBy.desc === 0) {
                    return (a, b) => a[sortBy.field].localeCompare(b[sortBy.field])
                }
                return (a, b) => b[sortBy.field].localeCompare(a[sortBy.field])
            case 'price':
            case 'changes':
            case 'marketCapitalization':
            default:
                if (sortBy.desc === 0) {
                    return (a, b) => (a[sortBy.field] - b[sortBy.field])
                }
                return (a, b) => (b[sortBy.field] - a[sortBy.field])
        }
    }

    return (
        <table className="curTbl">
            <thead>
                <tr>
                    <th>Icon</th>
                    <th id="tbl-name" onClick={handleSortByClick}>Name <span className={"sort-icon " + (sortBy.desc === 1 ? "sort-icon-down" : "sort-icon-up")}>&#x27A4;</span></th>
                    <th id="tbl-ticker" onClick={handleSortByClick}>Ticker <span className={"sort-icon " + (sortBy.desc === 1 ? "sort-icon-down" : "sort-icon-up")}>&#x27A4;</span></th>
                    <th id="tbl-price" onClick={handleSortByClick}>Price <span className={"sort-icon " + (sortBy.desc === 1 ? "sort-icon-down" : "sort-icon-up")}>&#x27A4;</span></th>
                    <th id="tbl-changes" onClick={handleSortByClick}>Change <span className={"sort-icon " + (sortBy.desc === 1 ? "sort-icon-down" : "sort-icon-up")}>&#x27A4;</span></th>  
                    <th id="tbl-marketCapitalization" onClick={handleSortByClick}>Market Cap <span className={"sort-icon " + (sortBy.desc === 1 ? "sort-icon-down" : "sort-icon-up")}>&#x27A4;</span></th>
                </tr>
            </thead>
            <tbody>
            {props.currencies
              .sort(sortByFunc())
              .map(currency =>
                  <tr key={currency.ticker}>
                    <td><img alt={currency.name} src={process.env.PUBLIC_URL + '/icons/' + currency.ticker.toLowerCase() + '.svg' } /></td>
                    <td>{currency.name}</td>
                    <td>{currency.ticker}</td>
                    <td title={"$" + currency.price}>${currency.price.toFixed(2)}</td>
                    <td title={"$" + currency.changes + "%"}>{currency.changes.toFixed(2)}%</td>
                    <td title={"$" + currency.marketCapitalization}>${(currency.marketCapitalization / 1000000000).toFixed(2)}b</td>           
                  </tr>
            )}
          </tbody>
        </table>
    )
}