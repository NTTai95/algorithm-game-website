import type { TestCaseResult } from './validator-types'
import type {
  DiagnosticContextDetails,
  DiagnosticReport,
} from './diagnostic-types'

export class DiagnosticEngine {
  /**
   * Constructs a successful diagnostic report indicating full algorithm compliance.
   */
  static createSuccessReport(
    testCases: readonly TestCaseResult[] = [],
    totalHiddenTests: number = 5,
    algorithmName: string = 'Bubble Sort'
  ): DiagnosticReport {
    const passedCount = testCases.filter((t) => t.passed).length
    return {
      success: true,
      passed: true,
      valid: true,
      algorithmName,
      message:
        'Tất cả các bài kiểm tra ẩn đã vượt qua thành công! Thuật toán Bubble Sort chuẩn xác 100%.',
      hiddenTestsPassed: passedCount || totalHiddenTests,
      totalHiddenTests,
      testCases,
    }
  }

  /**
   * Analyzes syntax errors from Lexer or Parser and extracts pedagogical guidance.
   */
  static fromParserError(
    err: unknown,
    testCases: readonly TestCaseResult[] = [],
    algorithmName: string = 'Bubble Sort'
  ): DiagnosticReport {
    const rawMessage = err instanceof Error ? err.message : String(err)
    const lineNumber = this.extractLineNumber(rawMessage)

    let hint =
      'Cú pháp Java chưa hợp lệ. Hãy kiểm tra lại khai báo biến, kiểu dữ liệu và cấu trúc lệnh.'

    if (rawMessage.includes("';'") || rawMessage.includes('chấm phẩy')) {
      hint = "Kiểm tra dấu chấm phẩy ';' ở cuối câu lệnh."
    } else if (
      rawMessage.includes("'{'") ||
      rawMessage.includes("'}'") ||
      rawMessage.includes('ngoặc nhọn')
    ) {
      hint =
        "Kiểm tra các cặp ngoặc nhọn '{' và '}' đã được đóng mở đầy đủ giữa các khối lệnh."
    } else if (
      rawMessage.includes("'('") ||
      rawMessage.includes("')'") ||
      rawMessage.includes('ngoặc đơn')
    ) {
      hint =
        "Kiểm tra các cặp dấu ngoặc đơn '(' và ')' trong điều kiện `if`, vòng lặp `for`/`while` hoặc lời gọi hàm."
    } else if (rawMessage.includes('Ký tự không hợp lệ')) {
      hint =
        'Có ký tự không hợp lệ trong mã nguồn Java của bạn. Hãy kiểm tra các ký tự gõ nhầm hoặc tiếng Việt có dấu ngoài chuỗi ký tự.'
    }

    return {
      success: false,
      passed: false,
      valid: false,
      algorithmName,
      errorType: 'SYNTAX',
      severity: 'ERROR',
      message: rawMessage,
      violationReason: rawMessage,
      reason: rawMessage,
      lineNumber,
      contextDetails: {
        actual: 'Lỗi biên dịch cú pháp Java',
        expected: 'Mã Java hợp lệ theo ngữ pháp của hệ thống',
      },
      hint,
      hiddenTestsPassed: testCases.filter((t) => t.passed).length,
      totalHiddenTests: 5,
      testCases,
    }
  }

  /**
   * Analyzes runtime errors produced during execution on the Virtual Machine.
   */
  static fromVMError(
    err: unknown,
    currentLine?: number,
    stepIndex?: number,
    testCases: readonly TestCaseResult[] = [],
    algorithmName: string = 'Bubble Sort'
  ): DiagnosticReport {
    const rawMessage = err instanceof Error ? err.message : String(err)
    const lineNumber = this.extractLineNumber(rawMessage) ?? currentLine

    let hint =
      'Đã xảy ra lỗi thực thi trong quá trình chạy mã Java trên mô phỏng máy móc.'
    let contextDetails: DiagnosticContextDetails = {
      actual: 'Lỗi thực thi runtime',
      expected: 'Chương trình thực thi tuần tự không phát sinh ngoại lệ',
    }

    if (
      rawMessage.includes('ngoài phạm vi') ||
      rawMessage.includes('vượt quá giới hạn kho hàng')
    ) {
      hint =
        'Cần cẩu hoặc máy quét đã di chuyển vượt ra ngoài biên kho hàng. Hãy kiểm tra điều kiện biên của vòng lặp (ví dụ `j < countBox - 1 - i`).'
      contextDetails = {
        actual: 'Chỉ số máy móc vượt ngoài biên kho hàng',
        expected: '0 <= vị trí < countBox',
      }
    } else if (
      rawMessage.includes('không thể swap tại vị trí') ||
      rawMessage.includes('không có thùng hàng kế tiếp') ||
      rawMessage.includes('không thể hoán đổi')
    ) {
      hint =
        'Cần cẩu không thể swap tại vị trí cuối cùng vì không còn thùng hàng kế tiếp. Vòng lặp j chỉ nên chạy đến `countBox - 1 - i`.'
      contextDetails = {
        actual: 'Thực hiện swap tại vị trí cuối kho hàng',
        expected: 'Chỉ swap khi còn thùng hàng kế bên (j < countBox - 1)',
      }
    } else if (
      rawMessage.includes('vượt quá giới hạn') &&
      rawMessage.includes('bước thực thi')
    ) {
      hint =
        'Chương trình vượt quá giới hạn bước chạy (nguy cơ vòng lặp vô tận). Hãy kiểm tra biến đếm hoặc điều kiện dừng trong vòng lặp `for`/`while`.'
      contextDetails = {
        actual: 'Vòng lặp không dừng (vượt quá số bước tối đa)',
        expected: 'Vòng lặp có điều kiện kết thúc hữu hạn',
      }
    } else if (rawMessage.includes('Đối tượng máy móc không tồn tại')) {
      hint =
        'Hãy đảm bảo gọi đúng tên các đối tượng máy móc được cung cấp: `wareHouse`, `singleCrane`, `weightScanner`.'
      contextDetails = {
        actual: 'Tên đối tượng không hợp lệ',
        expected: 'wareHouse, singleCrane, hoặc weightScanner',
      }
    } else if (
      rawMessage.includes('Phương thức') &&
      rawMessage.includes('không tồn tại')
    ) {
      hint =
        'Phương thức không tồn tại trên đối tượng máy móc. Danh sách phương thức hợp lệ: `wareHouse.getCountBox()`, `weightScanner.getWeightBox()`, `weightScanner.move(1)`, `weightScanner.moveStart()`, `singleCrane.swap()`, `singleCrane.move(1)`, `singleCrane.moveStart()`.'
      contextDetails = {
        actual: 'Gọi phương thức chưa định nghĩa',
        expected: 'Phương thức chuẩn của máy móc',
      }
    } else if (rawMessage.includes('chưa được khai báo')) {
      hint =
        'Biến chưa được khai báo trước khi sử dụng. Hãy khai báo biến với kiểu dữ liệu `int` hoặc `boolean`.'
      contextDetails = {
        actual: 'Sử dụng biến chưa định nghĩa',
        expected: 'Biến đã được khai báo trước',
      }
    }

    return {
      success: false,
      passed: false,
      valid: false,
      algorithmName,
      errorType: 'MACHINE_RUNTIME',
      severity: 'ERROR',
      message: rawMessage,
      violationReason: rawMessage,
      reason: rawMessage,
      lineNumber,
      stepIndex,
      contextDetails,
      hint,
      hiddenTestsPassed: testCases.filter((t) => t.passed).length,
      totalHiddenTests: 5,
      testCases,
    }
  }

  /**
   * Analyzes violations of algorithm invariants (e.g. non-adjacent swap, illegal swap direction).
   */
  static fromInvariantViolation(
    reason: string,
    details?: {
      actual?: string
      expected?: string
      indices?: [number, number]
      lineNumber?: number
      stepIndex?: number
    },
    testCases: readonly TestCaseResult[] = [],
    algorithmName: string = 'Bubble Sort'
  ): DiagnosticReport {
    let hint =
      'Thao tác của máy móc vi phạm tính bất biến của giải thuật Bubble Sort.'

    if (reason.includes('liền kề') || reason.includes('kề nhau')) {
      hint =
        'Cần cẩu cơ học (SingleCrane) chỉ có thể hoán đổi 2 thùng hàng kề sát nhau (|indexA - indexB| == 1). Không thể gắp qua khoảng cách xa.'
    } else if (
      reason.includes('không lớn hơn') ||
      reason.includes('Vi phạm hoán đổi')
    ) {
      hint =
        'Trong thuật toán Bubble Sort tăng dần, chỉ hoán đổi 2 thùng hàng khi thùng đứng trước nặng hơn thùng đứng sau (boxWeight1 > boxWeight2).'
    } else if (
      reason.includes('WeightScanner') ||
      reason.includes('chưa quét') ||
      reason.includes('đọc cân nặng')
    ) {
      hint =
        'Thuật toán Bubble Sort yêu cầu phải dùng WeightScanner để quét khối lượng của các thùng hàng trước khi quyết định cần cẩu có hoán đổi hay không.'
    } else if (
      reason.includes('chưa nổi bọt') ||
      reason.includes('lớn nhất')
    ) {
      hint =
        'Sau mỗi lượt quét (pass), phần tử có khối lượng lớn nhất trong đoạn chưa sắp xếp phải nổi bọt về vị trí cuối cùng của đoạn đó.'
    } else if (
      reason.includes('thất thoát') ||
      reason.includes('trùng lặp') ||
      reason.includes('sửa đổi')
    ) {
      hint =
        'Dữ liệu kho hàng bị thất thoát hoặc sai lệch. Hãy đảm bảo chỉ dùng `swap()` để hoán đổi vị trí các thùng hàng.'
    }

    const contextDetails: DiagnosticContextDetails = {
      actual: details?.actual ?? 'Hành vi vi phạm bất biến giải thuật',
      expected: details?.expected ?? 'Tuân thủ đúng quy chuẩn Bubble Sort',
      indices: details?.indices,
    }

    return {
      success: false,
      passed: false,
      valid: false,
      algorithmName,
      errorType: 'INVARIANT',
      severity: 'ERROR',
      message: reason,
      violationReason: reason,
      reason,
      lineNumber: details?.lineNumber,
      stepIndex: details?.stepIndex,
      contextDetails,
      hint,
      hiddenTestsPassed: testCases.filter((t) => t.passed).length,
      totalHiddenTests: 5,
      testCases,
    }
  }

  /**
   * Constructs report for an algorithm run that finished without exceptions but left the array unsorted.
   */
  static fromUnsortedResult(
    currentWeights: readonly number[],
    sortedWeights: readonly number[],
    testCases: readonly TestCaseResult[] = [],
    algorithmName: string = 'Bubble Sort'
  ): DiagnosticReport {
    const message =
      'Mảng sau khi chạy xong tất cả câu lệnh vẫn chưa được sắp xếp tăng dần theo khối lượng.'
    return {
      success: false,
      passed: false,
      valid: false,
      algorithmName,
      errorType: 'UNSORTED',
      severity: 'ERROR',
      message,
      violationReason: message,
      reason: message,
      contextDetails: {
        actual: `[${currentWeights.join(', ')}]`,
        expected: `[${sortedWeights.join(', ')}]`,
      },
      hint: 'Các thùng hàng chưa được sắp xếp tăng dần theo khối lượng (kg). Hãy kiểm tra lại 2 vòng lặp lồng nhau và điều kiện hoán đổi (boxWeight1 > boxWeight2).',
      hiddenTestsPassed: testCases.filter((t) => t.passed).length,
      totalHiddenTests: 5,
      testCases,
    }
  }

  /**
   * Helper to extract line number from error message strings.
   */
  private static extractLineNumber(message: string): number | undefined {
    const match = message.match(/(?:Dòng|dòng)\s*(\d+)/i)
    if (match && match[1]) {
      const num = parseInt(match[1], 10)
      if (!isNaN(num)) {
        return num
      }
    }
    return undefined
  }
}
