import type { LevelMachine } from '../levels/types'

export interface MachineMethodDoc {
  /** Method name as it exists on the runtime machine object */
  readonly name: string
  /** Java call signature shown to the player */
  readonly signature: string
  readonly returns: 'int' | 'boolean' | 'void'
  readonly desc: string
}

export interface MachineDoc {
  readonly id: LevelMachine
  /** Java parameter type used in `solve(...)` */
  readonly className: string
  readonly icon: string
  readonly summary: string
  readonly methods: readonly MachineMethodDoc[]
}

/**
 * Canonical machine API dictionary. Must stay in sync with the public methods of
 * WarehouseEnvironment, WeightScanner and SingleCrane.
 */
export const MACHINE_DOCS: Record<LevelMachine, MachineDoc> = {
  wareHouse: {
    id: 'wareHouse',
    className: 'wareHouse',
    icon: '📦',
    summary: 'Cung cấp thông tin tổng quan về kho hàng.',
    methods: [
      {
        name: 'getCountBox',
        signature: 'wareHouse.getCountBox()',
        returns: 'int',
        desc: 'Trả về tổng số lượng thùng hàng trong kho.',
      },
    ],
  },
  weightScanner: {
    id: 'weightScanner',
    className: 'WeightScanner',
    icon: '🔍',
    summary: 'Cảm biến chạy trên ray, chỉ có nhiệm vụ đọc khối lượng thùng hàng.',
    methods: [
      {
        name: 'getWeightBox',
        signature: 'weightScanner.getWeightBox()',
        returns: 'int',
        desc: 'Đọc khối lượng (kg) của thùng hàng tại vị trí cảm biến đang đứng.',
      },
      {
        name: 'move',
        signature: 'weightScanner.move(int step)',
        returns: 'boolean',
        desc: 'Di chuyển cảm biến tiến (+) hoặc lùi (-) step ô. Báo lỗi nếu vượt ra ngoài kho.',
      },
      {
        name: 'moveStart',
        signature: 'weightScanner.moveStart()',
        returns: 'void',
        desc: 'Đưa cảm biến quay về vị trí đầu tiên (ô 0).',
      },
      {
        name: 'position',
        signature: 'weightScanner.position()',
        returns: 'int',
        desc: 'Trả về chỉ số ô hiện tại của cảm biến (bắt đầu từ 0).',
      },
    ],
  },
  singleCrane: {
    id: 'singleCrane',
    className: 'SingleCrane',
    icon: '🏗️',
    summary: 'Cần cẩu chạy trên ray, chỉ có nhiệm vụ hoán đổi 2 thùng hàng liền kề.',
    methods: [
      {
        name: 'swap',
        signature: 'singleCrane.swap()',
        returns: 'boolean',
        desc: 'Hoán đổi thùng hàng tại vị trí cần cẩu với thùng liền kề kế tiếp (+1). Báo lỗi nếu đang ở ô cuối.',
      },
      {
        name: 'move',
        signature: 'singleCrane.move(int step)',
        returns: 'boolean',
        desc: 'Di chuyển cần cẩu tiến (+) hoặc lùi (-) step ô. Báo lỗi nếu vượt ra ngoài kho.',
      },
      {
        name: 'moveStart',
        signature: 'singleCrane.moveStart()',
        returns: 'void',
        desc: 'Đưa cần cẩu quay về vị trí đầu tiên (ô 0).',
      },
      {
        name: 'position',
        signature: 'singleCrane.position()',
        returns: 'int',
        desc: 'Trả về chỉ số ô hiện tại của cần cẩu (bắt đầu từ 0).',
      },
    ],
  },
}

/** Display order of machine tabs, independent of level config order. */
const MACHINE_ORDER: readonly LevelMachine[] = ['wareHouse', 'weightScanner', 'singleCrane']

/**
 * Returns docs for exactly the machines allotted to a level, in canonical order.
 */
export function getMachineDocs(allowedMachines: readonly LevelMachine[]): MachineDoc[] {
  return MACHINE_ORDER.filter((id) => allowedMachines.includes(id)).map((id) => MACHINE_DOCS[id])
}
