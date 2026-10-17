import React, { useState } from 'react'

export const ApiReference: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  const methods = [
    {
      signature: 'crane.length()',
      returns: 'int',
      desc: 'Trả về tổng số lượng thùng hàng trong kho mảng.',
    },
    {
      signature: 'crane.position()',
      returns: 'int',
      desc: 'Trả về chỉ số vị trí ô hiện tại của cần cẩu (bắt đầu từ 0).',
    },
    {
      signature: 'crane.read()',
      returns: 'int',
      desc: 'Đọc giá trị số của thùng hàng ngay dưới cần cẩu.',
    },
    {
      signature: 'crane.next()',
      returns: 'boolean',
      desc: 'Di chuyển cần cẩu tiến về phía trước 1 ô. Trả về false nếu ở cuối.',
    },
    {
      signature: 'crane.prev()',
      returns: 'boolean',
      desc: 'Di chuyển cần cẩu lùi về phía sau 1 ô. Trả về false nếu ở đầu.',
    },
    {
      signature: 'crane.reset()',
      returns: 'void',
      desc: 'Đưa cần cẩu trở về vị trí đầu tiên (ô 0).',
    },
    {
      signature: 'crane.compare()',
      returns: 'int',
      desc: 'So sánh thùng hiện tại với thùng liền kề (+1). Trả về 1 (>), -1 (<), hoặc 0 (==).',
    },
    {
      signature: 'crane.swap()',
      returns: 'boolean',
      desc: 'Hoán đổi vị trí thùng hiện tại với thùng liền kề (+1).',
    },
  ]

  return (
    <div className={`api-reference-card ${isOpen ? 'open' : 'closed'}`}>
      <div className="api-reference-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="api-title">📖 Sổ Tay Lệnh Máy Móc (Crane API)</span>
        <span className="api-toggle-icon">{isOpen ? '▼' : '▶'}</span>
      </div>

      {isOpen && (
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
              {methods.map((m) => (
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
      )}
    </div>
  )
}
