import React from 'react';
import * as XLSX from 'xlsx';
import './InventoryTable.css';

const InventoryTable = ({ items, onDeleteItem, supplierName }) => {
  const handleExport = () => {
    if (items.length === 0) {
      alert('Keine Daten zum Exportieren vorhanden');
      return;
    }

    // Prepare data for Excel
    const data = items.map((item, index) => ({
      'Nr.': index + 1,
      'Ersatzteilnummer': item.partNumber,
      'Bezeichnung': item.description,
      'Bestand': item.quantity || 0,
      'Lieferant': item.supplier,
      'Zeitstempel': new Date(item.timestamp).toLocaleString('de-DE')
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    // Set column widths
    ws['!cols'] = [
      { wch: 5 },  // Nr.
      { wch: 20 }, // Ersatzteilnummer
      { wch: 30 }, // Bezeichnung
      { wch: 10 }, // Bestand
      { wch: 15 }, // Lieferant
      { wch: 20 }  // Zeitstempel
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Inventur');

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `Inventur_${supplierName}_${timestamp}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);
  };

  if (items.length === 0) {
    return (
      <div className="inventory-table-container">
        <div className="table-header">
          <h3>Erfasste Ersatzteile</h3>
        </div>
        <div className="empty-state">
          <p>Noch keine Ersatzteile erfasst</p>
          <p className="empty-state-hint">Scannen oder erfassen Sie Ersatzteile, um zu beginnen</p>
        </div>
      </div>
    );
  }

  return (
    <div className="inventory-table-container">
      <div className="table-header">
        <h3>Erfasste Ersatzteile ({items.length})</h3>
        <button onClick={handleExport} className="btn-export">
          📊 Excel exportieren
        </button>
      </div>

      <div className="table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Nr.</th>
              <th>Ersatzteilnummer</th>
              <th>Bezeichnung</th>
              <th>Bestand</th>
              <th>Zeitstempel</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td className="part-number">{item.partNumber}</td>
                <td>{item.description}</td>
                <td className="quantity">{item.quantity || 0}</td>
                <td className="timestamp">
                  {new Date(item.timestamp).toLocaleString('de-DE')}
                </td>
                <td>
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="btn-delete"
                    title="Löschen"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
