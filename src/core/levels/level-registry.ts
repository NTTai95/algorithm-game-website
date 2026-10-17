import type { LevelConfig, LevelId } from './types'

export const LEVEL_REGISTRY: Record<LevelId, LevelConfig> = {
  '0.1': {
    id: '0.1',
    path: '/tutorial/0.1',
    hash: '#/tutorial/0.1',
    category: 'TUTORIAL',
    title: 'Màn 0.1: Cảm Biến Tia Laser (WeightScanner)',
    stageTag: 'Màn 0.1',
    subtitle: 'Làm quen cơ chế đọc khối lượng và di chuyển máy quét trên đường ray cảm biến',
    objective:
      'Sử dụng cỗ máy `WeightScanner` để quét đọc khối lượng từng thùng hàng từ đầu đến cuối kho và đưa máy quét về vị trí 0.',
    goldenRule:
      '`weightScanner.getWeightBox()` đọc khối lượng thùng hiện tại; `weightScanner.move(1)` di chuyển tiến 1 ô.',
    initialArray: [15, 42, 8, 25],
    machines: ['wareHouse', 'weightScanner'],
    defaultCode: `public static void solve(wareHouse wareHouse, WeightScanner weightScanner) {
    int countBox = wareHouse.getCountBox();

    // Duyệt qua từng ô trong kho hàng để kích hoạt cảm biến quét
    for (int i = 0; i < countBox; i++) {
        int weight = weightScanner.getWeightBox(); // Đọc khối lượng (kg)

        if (i < countBox - 1) {
            weightScanner.move(1); // Di chuyển đến thùng tiếp theo
        }
    }

    weightScanner.moveStart(); // Đưa máy quét trở lại vị trí ban đầu
}
`,
    templates: {
      standard: `public static void solve(wareHouse wareHouse, WeightScanner weightScanner) {
    int countBox = wareHouse.getCountBox();

    for (int i = 0; i < countBox; i++) {
        int weight = weightScanner.getWeightBox();
        if (i < countBox - 1) {
            weightScanner.move(1);
        }
    }

    weightScanner.moveStart();
}
`,
      stepByStep: `public static void solve(wareHouse wareHouse, WeightScanner weightScanner) {
    // Đọc ô 0
    int w0 = weightScanner.getWeightBox();
    weightScanner.move(1);

    // Đọc ô 1
    int w1 = weightScanner.getWeightBox();
    weightScanner.move(1);

    // Đưa máy quét về vị trí bắt đầu
    weightScanner.moveStart();
}
`,
    },
    apiDocs: [
      {
        signature: 'wareHouse.getCountBox()',
        returns: 'int',
        desc: 'Lấy tổng số lượng thùng hàng trong kho hàng.',
        machine: 'wareHouse',
      },
      {
        signature: 'weightScanner.getWeightBox()',
        returns: 'int',
        desc: 'Bắn tia laser đọc khối lượng (kg) của thùng hàng tại vị trí máy quét.',
        machine: 'weightScanner',
      },
      {
        signature: 'weightScanner.move(1)',
        returns: 'boolean',
        desc: 'Di chuyển máy quét tiến về trước 1 ô trên ray cảm biến.',
        machine: 'weightScanner',
      },
      {
        signature: 'weightScanner.moveStart()',
        returns: 'void',
        desc: 'Lướt nhanh máy quét trở về vị trí đầu tiên (ô 0).',
        machine: 'weightScanner',
      },
    ],
    isUnlocked: true,
  },

  '0.2': {
    id: '0.2',
    path: '/tutorial/0.2',
    hash: '#/tutorial/0.2',
    category: 'TUTORIAL',
    title: 'Màn 0.2: Cần Cẩu Cơ Học (SingleCrane)',
    stageTag: 'Màn 0.2',
    subtitle: 'Làm quen cơ chế gắp và hoán đổi vị trí hai thùng hàng liền kề trên ray cần cẩu',
    objective:
      'Sử dụng `SingleCrane` để hoán đổi cặp thùng hàng đầu tiên, di chuyển tới và hoán đổi cặp kế tiếp.',
    goldenRule:
      '`singleCrane.swap()` hoán đổi 2 thùng liền kề (vị trí hiện tại và hiện tại + 1). Không thể hoán đổi vượt xa.',
    initialArray: [50, 20, 30, 10],
    machines: ['wareHouse', 'singleCrane'],
    defaultCode: `public static void solve(wareHouse wareHouse, SingleCrane singleCrane) {
    // Hoán đổi 2 thùng tại vị trí 0 và 1 (50kg và 20kg -> 20kg và 50kg)
    singleCrane.swap();

    // Di chuyển cần cẩu sang vị trí 1
    singleCrane.move(1);

    // Hoán đổi 2 thùng tại vị trí 1 và 2 (50kg và 30kg -> 30kg và 50kg)
    singleCrane.swap();

    // Đưa cần cẩu trở về vị trí bắt đầu (ô 0)
    singleCrane.moveStart();
}
`,
    templates: {
      standard: `public static void solve(wareHouse wareHouse, SingleCrane singleCrane) {
    singleCrane.swap();
    singleCrane.move(1);
    singleCrane.swap();
    singleCrane.moveStart();
}
`,
    },
    apiDocs: [
      {
        signature: 'wareHouse.getCountBox()',
        returns: 'int',
        desc: 'Lấy tổng số lượng thùng hàng trong kho hàng.',
        machine: 'wareHouse',
      },
      {
        signature: 'singleCrane.swap()',
        returns: 'boolean',
        desc: 'Hạ giàn gắp, đổi chỗ 2 thùng hàng liền kề tại vị trí hiện tại và ô kế tiếp.',
        machine: 'singleCrane',
      },
      {
        signature: 'singleCrane.move(1)',
        returns: 'boolean',
        desc: 'Cần cẩu di chuyển tiến về phía trước 1 ô trên giàn ray trên.',
        machine: 'singleCrane',
      },
      {
        signature: 'singleCrane.moveStart()',
        returns: 'void',
        desc: 'Đưa cần cẩu trở về vị trí đầu tiên (ô 0).',
        machine: 'singleCrane',
      },
    ],
    isUnlocked: true,
  },

  '0.3': {
    id: '0.3',
    path: '/tutorial/0.3',
    hash: '#/tutorial/0.3',
    category: 'TUTORIAL',
    title: 'Màn 0.3: Hiệu Chuẩn Phối Hợp (Combo Máy Móc)',
    stageTag: 'Màn 0.3',
    subtitle: 'Kết hợp cảm biến WeightScanner và cơ cấu SingleCrane để hoán đổi có điều kiện',
    objective:
      'Dùng `weightScanner` đo khối lượng 2 thùng hàng đầu tiên. Nếu thùng đứng trước nặng hơn thùng đứng sau, kích hoạt `singleCrane.swap()`.',
    goldenRule:
      'Máy quét thu thập dữ liệu cân nặng trước; Cần cẩu chỉ hoán đổi khi phát hiện nghịch thế (`boxWeight1 > boxWeight2`).',
    initialArray: [60, 25, 40, 15],
    machines: ['wareHouse', 'singleCrane', 'weightScanner'],
    defaultCode: `public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner) {
    // Đo khối lượng thùng thứ nhất tại vị trí 0
    int boxWeight1 = weightScanner.getWeightBox();

    // Máy quét tiến 1 ô để đo thùng thứ hai tại vị trí 1
    weightScanner.move(1);
    int boxWeight2 = weightScanner.getWeightBox();

    // So sánh: nếu thùng trước nặng hơn thùng sau thì cần cẩu thực hiện hoán đổi
    if (boxWeight1 > boxWeight2) {
        singleCrane.swap();
    }

    // Đưa cả hai cỗ máy trở về vị trí bắt đầu
    singleCrane.moveStart();
    weightScanner.moveStart();
}
`,
    templates: {
      standard: `public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner) {
    int boxWeight1 = weightScanner.getWeightBox();
    weightScanner.move(1);
    int boxWeight2 = weightScanner.getWeightBox();

    if (boxWeight1 > boxWeight2) {
        singleCrane.swap();
    }

    singleCrane.moveStart();
    weightScanner.moveStart();
}
`,
    },
    apiDocs: [
      {
        signature: 'wareHouse.getCountBox()',
        returns: 'int',
        desc: 'Lấy tổng số lượng thùng hàng trong kho.',
        machine: 'wareHouse',
      },
      {
        signature: 'weightScanner.getWeightBox()',
        returns: 'int',
        desc: 'Lấy khối lượng (kg) thùng hàng dưới cảm biến quét.',
        machine: 'weightScanner',
      },
      {
        signature: 'weightScanner.move(1)',
        returns: 'boolean',
        desc: 'Di chuyển máy quét tiến 1 ô.',
        machine: 'weightScanner',
      },
      {
        signature: 'weightScanner.moveStart()',
        returns: 'void',
        desc: 'Đưa máy quét về vị trí 0.',
        machine: 'weightScanner',
      },
      {
        signature: 'singleCrane.swap()',
        returns: 'boolean',
        desc: 'Đổi chỗ 2 thùng hàng tại vị trí cần cẩu và vị trí kế tiếp.',
        machine: 'singleCrane',
      },
      {
        signature: 'singleCrane.move(1)',
        returns: 'boolean',
        desc: 'Cần cẩu di chuyển tiến 1 ô.',
        machine: 'singleCrane',
      },
      {
        signature: 'singleCrane.moveStart()',
        returns: 'void',
        desc: 'Đưa cần cẩu về vị trí 0.',
        machine: 'singleCrane',
      },
    ],
    isUnlocked: true,
  },

  'bubble-sort': {
    id: 'bubble-sort',
    path: '/level/bubble-sort',
    hash: '#/level/bubble-sort',
    category: 'ALGORITHM',
    title: 'Màn 1: Thuật Toán Bubble Sort (Đa Cỗ Máy)',
    stageTag: 'Màn 1: Bubble Sort',
    subtitle: 'Sắp xếp toàn bộ kho hàng tăng dần theo khối lượng thùng hàng (kg)',
    objective:
      'Triển khai thuật toán Bubble Sort chuẩn bằng phương thức `solve` nhận các cỗ máy `wareHouse`, `singleCrane`, `weightScanner`.',
    goldenRule:
      'Mỗi pass đưa phần tử có khối lượng lớn nhất về cuối dãy chưa sắp xếp; chỉ swap khi `boxWeight1 > boxWeight2`; kết thúc pass đưa 2 máy về đầu mảng.',
    initialArray: [64, 34, 25, 12, 22, 11, 90],
    machines: ['wareHouse', 'singleCrane', 'weightScanner'],
    defaultCode: `public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner) {
    int countBox = wareHouse.getCountBox();

    for (int i = 0; i < countBox - 1; i++) {
        boolean swapped = false;

        for (int j = 0; j < countBox - 1 - i; j++) {
            int boxWeight1 = weightScanner.getWeightBox(); // lấy khối lượng của box ở vị trí máy đang đứng
            weightScanner.move(1); // di chuyển về trước 1 ô
            int boxWeight2 = weightScanner.getWeightBox();

            if (boxWeight1 > boxWeight2) {
                singleCrane.swap(); // đổi vị trí của 2 box tại vị trí của cần cẩu
                swapped = true;
            }

            singleCrane.move(1); // cần cẩu di chuyển về trước 1 ô
        }

        if (!swapped) {
            break;
        }

        singleCrane.moveStart();
        weightScanner.moveStart();
    }
}
`,
    templates: {
      standard: `public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner) {
    int countBox = wareHouse.getCountBox();

    for (int i = 0; i < countBox - 1; i++) {
        boolean swapped = false;

        for (int j = 0; j < countBox - 1 - i; j++) {
            int boxWeight1 = weightScanner.getWeightBox();
            weightScanner.move(1);
            int boxWeight2 = weightScanner.getWeightBox();

            if (boxWeight1 > boxWeight2) {
                singleCrane.swap();
                swapped = true;
            }

            singleCrane.move(1);
        }

        if (!swapped) {
            break;
        }

        singleCrane.moveStart();
        weightScanner.moveStart();
    }
}
`,
      skeleton: `public static void solve(wareHouse wareHouse, SingleCrane singleCrane, WeightScanner weightScanner) {
    int countBox = wareHouse.getCountBox();

    for (int i = 0; i < countBox - 1; i++) {
        boolean swapped = false;

        for (int j = 0; j < countBox - 1 - i; j++) {
            // TODO: Dùng weightScanner để đọc và so sánh khối lượng 2 thùng hàng kề nhau
            // TODO: Nếu thùng trước nặng hơn thùng sau, ra lệnh singleCrane.swap()

            singleCrane.move(1);
        }

        if (!swapped) {
            break;
        }

        singleCrane.moveStart();
        weightScanner.moveStart();
    }
}
`,
    },
    apiDocs: [
      {
        signature: 'wareHouse.getCountBox()',
        returns: 'int',
        desc: 'Lấy tổng số lượng thùng hàng trong kho mảng.',
        machine: 'wareHouse',
      },
      {
        signature: 'weightScanner.getWeightBox()',
        returns: 'int',
        desc: 'Đọc khối lượng của thùng hàng tại vị trí máy quét đang đứng.',
        machine: 'weightScanner',
      },
      {
        signature: 'weightScanner.move(1)',
        returns: 'boolean',
        desc: 'Máy quét di chuyển về phía trước 1 ô.',
        machine: 'weightScanner',
      },
      {
        signature: 'weightScanner.moveStart()',
        returns: 'void',
        desc: 'Máy quét quay trở về vị trí đầu tiên (ô 0).',
        machine: 'weightScanner',
      },
      {
        signature: 'singleCrane.swap()',
        returns: 'boolean',
        desc: 'Đổi vị trí của 2 thùng hàng tại vị trí cần cẩu và vị trí kế tiếp.',
        machine: 'singleCrane',
      },
      {
        signature: 'singleCrane.move(1)',
        returns: 'boolean',
        desc: 'Cần cẩu di chuyển về phía trước 1 ô.',
        machine: 'singleCrane',
      },
      {
        signature: 'singleCrane.moveStart()',
        returns: 'void',
        desc: 'Cần cẩu quay trở về vị trí đầu tiên (ô 0).',
        machine: 'singleCrane',
      },
    ],
    isUnlocked: true,
  },
}

export const ALL_LEVELS = Object.values(LEVEL_REGISTRY)

export function getLevelById(id: string): LevelConfig {
  if (id in LEVEL_REGISTRY) {
    return LEVEL_REGISTRY[id as LevelId]
  }
  return LEVEL_REGISTRY['bubble-sort']
}

export function parseRouteHash(hash: string): { page: 'home' | 'playground'; levelId?: LevelId } {
  const clean = hash.replace(/^#/, '').trim()

  if (!clean || clean === '/' || clean === '/home') {
    return { page: 'home' }
  }

  if (clean === '/level/bubble-sort' || clean === '/bubble-sort') {
    return { page: 'playground', levelId: 'bubble-sort' }
  }

  if (clean.startsWith('/tutorial/')) {
    const id = clean.replace('/tutorial/', '') as LevelId
    if (id in LEVEL_REGISTRY) {
      return { page: 'playground', levelId: id }
    }
  }

  return { page: 'home' }
}
