import React, { useState } from 'react'
import type { LevelMachine } from '../core/levels/types'
import { getMachineDocs } from '../core/machines/machine-docs'

interface ApiReferenceProps {
  allowedMachines: readonly LevelMachine[]
}

export const ApiReference: React.FC<ApiReferenceProps> = ({ allowedMachines }) => {
  const [isOpen, setIsOpen] = useState(true)
  const docs = getMachineDocs(allowedMachines)
  const [activeId, setActiveId] = useState<LevelMachine | undefined>(docs[0]?.id)

  const activeDoc = docs.find((d) => d.id === activeId) ?? docs[0]

  return (
    <div className={`api-reference-card ${isOpen ? 'open' : 'closed'}`}>
      <div className="api-reference-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="api-title">📖 Sổ Tay Lệnh Máy Móc ({docs.length} máy được cấp)</span>
        <span className="api-toggle-icon">{isOpen ? '▼' : '▶'}</span>
      </div>

      {isOpen && activeDoc && (
        <>
          {docs.length > 1 && (
            <div className="api-tabs" role="tablist">
              {docs.map((doc) => (
                <button
                  key={doc.id}
                  type="button"
                  role="tab"
                  aria-selected={doc.id === activeDoc.id}
                  className={`api-tab api-tab-${doc.id} ${doc.id === activeDoc.id ? 'active' : ''}`}
                  onClick={() => setActiveId(doc.id)}
                >
                  <span>{doc.icon}</span> {doc.className}
                </button>
              ))}
            </div>
          )}

          <p className="api-machine-summary">{activeDoc.summary}</p>

          <div className="api-table-wrapper">
            <table className="api-table">
              <thead>
                <tr>
                  <th>Hàm</th>
                  <th>Trả về</th>
                  <th>Mô tả chức năng</th>
                </tr>
              </thead>
              <tbody>
                {activeDoc.methods.map((m) => (
                  <tr key={m.signature}>
                    <td>
                      <code className="code-badge">{m.signature}</code>
                    </td>
                    <td>
                      <span className="type-badge">{m.returns}</span>
                    </td>
                    <td className="desc-cell">{m.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
