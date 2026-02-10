import React from 'react';
import ExcelJS from 'exceljs';
import './InventoryTable.css';

const InventoryTable = ({ items, onDeleteItem, supplierName }) => {
  const handleExport = async () => {
    if (items.length === 0) {
      alert('Keine Daten zum Exportieren vorhanden');
      return;
    }

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Inventur');

    // Define columns
    worksheet.columns = [
      { header: 'Nr.', key: 'nr', width: 5 },
      { header: 'Ersatzteilnummer', key: 'partNumber', width: 20 },
      { header: 'Bezeichnung', key: 'description', width: 30 },
      { header: 'Bestand', key: 'quantity', width: 10 },
      { header: 'Lieferant', key: 'supplier', width: 15 },
      { header: 'Zeitstempel', key: 'timestamp', width: 20 }
    ];

    // Add data rows
    items.forEach((item, index) => {
      worksheet.addRow({
        nr: index + 1,
        partNumber: item.partNumber,
        description: item.description,
        quantity: item.quantity || 0,
        supplier: item.supplier,
        timestamp: new Date(item.timestamp).toLocaleString('de-DE')
      });
    });

    // Style the header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'left' };

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `Inventur_${supplierName}_${timestamp}.xlsx`;

    // Write to buffer and download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
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
