import React, { useState } from 'react';
import InventoryForm from './InventoryForm';
import './SupplierSelection.css';

const SupplierSelection = () => {
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const suppliers = [
    { id: 'lieferant1', name: 'Lieferant 1', code: 'L1' },
    { id: 'lieferant2', name: 'Lieferant 2', code: 'L2' },
    { id: 'lieferant3', name: 'Lieferant 3', code: 'L3' },
    { id: 'lieferant4', name: 'Lieferant 4', code: 'L4' },
  ];

  const handleSupplierSelect = (supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleBack = () => {
    setSelectedSupplier(null);
  };

  if (selectedSupplier) {
    return <InventoryForm supplier={selectedSupplier} onBack={handleBack} />;
  }

  return (
    <div className="supplier-selection">
      <h2>Lieferanten auswählen</h2>
      <p className="subtitle">Wählen Sie einen Lieferanten für die Inventur aus</p>
      
      <div className="supplier-grid">
        {suppliers.map((supplier) => (
          <button
            key={supplier.id}
            className="supplier-card"
            onClick={() => handleSupplierSelect(supplier)}
          >
            <div className="supplier-icon">{supplier.code}</div>
            <div className="supplier-name">{supplier.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SupplierSelection;
