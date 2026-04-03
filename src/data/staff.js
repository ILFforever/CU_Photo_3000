const STAFF = [
  // MU
  { id: 'MU-1',  uni: 'MU', role: '-',              fullName: 'นางสาวจิตาภา สันเจริญ',          nickname: 'จีจี้',    phone: '096-660-3097', group: 6 },
  { id: 'MU-2',  uni: 'MU', role: 'กิจกรรม',        fullName: 'นางสาวจารีรัตน์ จันทกาญจน์',     nickname: 'อุ้ม',     phone: '098-524-4399', group: 1 },
  { id: 'MU-3',  uni: 'MU', role: '-',              fullName: 'นาย ชัยวัฒน์ บุญศิริ',           nickname: 'เกียร์',   phone: '094-495-0958', group: 5 },
  { id: 'MU-4',  uni: 'MU', role: 'เหรัญญิกและทะเบียน', fullName: 'นางสาวพิมพกานต์ รัตนพันธ์', nickname: 'เกี๊ยว',  phone: '082-921-5939', group: 1 },
  { id: 'MU-5',  uni: 'MU', role: 'พยาบาล',         fullName: 'นางสาวสุกัญญา ปานมพฤกษ์',       nickname: 'เอิร์น',  phone: '098-798-2788', group: null },
  { id: 'MU-6',  uni: 'MU', role: 'สวัสดิการ',      fullName: 'นางสาวเมทินี ซุ่นฮ้อ',           nickname: 'คุกกี้',  phone: '099-539-8929', group: 3 },
  { id: 'MU-7',  uni: 'MU', role: 'สถานที่ พัสดุ',  fullName: 'นางสาวจุฬาลักษณ์ ใจเชื่อม',     nickname: 'ปอเปิ้ล', phone: '083-440-4506', group: 2 },
  { id: 'MU-8',  uni: 'MU', role: 'พยาบาล',         fullName: 'นางสาวอนรรฆวี ทรัพย์นาทวี',     nickname: 'แบมม',    phone: '094-989-2995', group: 4 },
  // CU
  { id: 'CU-1',  uni: 'CU', role: 'วิชาการ',        fullName: 'นาย ณัฏฐ์ ณัฏฐาชัย',            nickname: 'มิกกี้',  phone: '096-992-4496', group: 1 },
  { id: 'CU-2',  uni: 'CU', role: 'เหรัญญิก',       fullName: 'นาย วริศนันตร์ รัตนาชัยพงษ์',   nickname: 'พีช',     phone: '088-932-1500', group: 5 },
  { id: 'CU-3',  uni: 'CU', role: 'กิจกรรมและสถานที่', fullName: 'นาย ธนบดี มุกุระ',           nickname: 'แฮมมี่',  phone: '097-921-7776', group: 4 },
  { id: 'CU-4',  uni: 'CU', role: 'วิชาการ',        fullName: 'นาย ชยธร อุ่นภัทร',             nickname: 'น้อบ',    phone: '095-708-4210', group: 3 },
  { id: 'CU-5',  uni: 'CU', role: 'สถานที่',        fullName: 'นาย จิรวัฒน์ ด่านคอนสกุล',      nickname: 'ปอนด์',   phone: '098-428-8440', group: 2 },
  { id: 'CU-6',  uni: 'CU', role: 'สวัสดิการ',      fullName: 'นาย ภาสวีร์ เพิ่มพูลทรัพย์',    nickname: 'วีร์',    phone: '098-285-1617', group: 6 },
  { id: 'CU-7',  uni: 'CU', role: 'กิจกรรม',        fullName: 'นาย คมชาญ ชูเชื้อ',             nickname: 'ไม้',     phone: '096-785-8021', group: 1 },
  { id: 'CU-8',  uni: 'CU', role: 'พยาบาล',         fullName: 'นาย ธนวัฒน์ วงษ์ทองตระกูล',    nickname: 'ปิง',     phone: '082-598-5636', group: 3 },
  { id: 'CU-9',  uni: 'CU', role: 'วิชาการ',        fullName: 'น.ส. ชญาภา ใจรักสันติสุข',      nickname: 'เอิง',    phone: '082-403-9119', group: 6 },
  { id: 'CU-10', uni: 'CU', role: 'พยาบาล',         fullName: 'น.ส. นิชาภา อุดมผล',            nickname: 'อินดี้',  phone: '096-089-6642', group: 5 },
  { id: 'CU-11', uni: 'CU', role: 'ทะเบียน',        fullName: 'น.ส. ญาณิศา สิงห์ทะยาน',       nickname: 'แพรรี่',  phone: '099-424-3569', group: 2 },
  { id: 'CU-12', uni: 'CU', role: 'กิจกรรม',        fullName: 'น.ส. พิมพ์นิภา ศักย์ธนสาร',    nickname: 'นุ่น',    phone: '092-774-0430', group: 4 },
  { id: 'CU-13', uni: 'CU', role: 'วิชาการ',        fullName: 'นาย ภาณุพงศ์ ภมรบุปผาชาติ',    nickname: 'ไม้โปร',  phone: '097-025-2627', group: 1 },
  // TU
  { id: 'TU-1',  uni: 'TU', role: 'พยาบาล',         fullName: 'นายภูตะวัน สินอาษา',            nickname: 'ตะวัน',   phone: '086-468-8288', group: 2 },
  { id: 'TU-2',  uni: 'TU', role: 'กิจกรรม',        fullName: 'นางสาวปัญญ์ชนก ศรีโยหะ',        nickname: 'ตัง',     phone: '095-907-2465', group: 6 },
  { id: 'TU-3',  uni: 'TU', role: 'สวัสดิการ',      fullName: 'นางสาวกชกร จรมาศ',              nickname: 'ดีไซน์',  phone: '063-080-7003', group: 5 },
  { id: 'TU-4',  uni: 'TU', role: 'กิจกรรม',        fullName: 'นางสาวธัญธิตา มีทรัพย์สถาพร',   nickname: 'ไมน์',    phone: '091-872-3307', group: 3 },
  { id: 'TU-5',  uni: 'TU', role: 'พยาบาล',         fullName: 'นางสาวรุจิรา มานะชัย',          nickname: 'เคท',     phone: '092-463-7789', group: 1 },
  { id: 'TU-6',  uni: 'TU', role: 'วิชาการ',        fullName: 'นายเอกอมาตย์ อมาตยกุล',         nickname: 'เอก',     phone: '087-518-7712', group: 4 },
  { id: 'TU-7',  uni: 'TU', role: 'วิชาการ',        fullName: 'นายภคิน ปราชญ์กิตติกุล',        nickname: 'โชกี้',   phone: '062-612-3039', group: 2 },
]

const UNI_META = {
  MU: { label: 'Mahidol',       th: 'มหิดล',       cls: 'mu' },
  CU: { label: 'Chulalongkorn', th: 'จุฬาลงกรณ์',  cls: 'cu' },
  TU: { label: 'Thammasat',     th: 'ธรรมศาสตร์',  cls: 'tu' },
}

export default STAFF
export { UNI_META }
