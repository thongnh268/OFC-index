import { type CertificateItem } from '../../../shared/components/certificate-grid/certificate-grid.component';
import { type InnerContentBlock } from '../../../shared/components/inner-content/inner-content.component';

// Code-owned bilingual content for the Policies of Quality Control page. Policy text is real
// company copy from the Figma design (Vietnamese is a working translation for review). The
// certificate cards render as placeholders until the real FSC/PEFC PDF previews are supplied
// (set thumbnailUrl + pdfUrl on each item).
export interface QualityContent {
  readonly breadcrumbHome: string;
  readonly breadcrumbAbout: string;
  readonly title: string;
  readonly blocks: readonly InnerContentBlock[];
  readonly certHeading: string;
  readonly certificates: readonly CertificateItem[];
}

const EN: QualityContent = {
  breadcrumbHome: 'Homepage',
  breadcrumbAbout: 'About us',
  title: 'Policies of Quality Control',
  blocks: [
    {
      paragraphs: [
        'Boards of Leadership of <b>THANH HOA CO., LTD.</b> and <b>DAI DUONG FOREST PRODUCTS JSC.</b> declare the Policies of Quality Control as follows:',
      ],
    },
    {
      heading: '1. Raw Material Policies',
      paragraphs: [
        'We are committed to providing customers with products manufactured from raw materials that comply with all requirements of the Government of Vietnam and the Forest Stewardship Council for the protection and development of forest resources.',
        'The Company is committed not to purchase or trade any materials from any of the following sources:',
      ],
      list: [
        'Timber harvested illegally;',
        'Timber harvested from areas where there are violations of cultural traditions or civil rights, or under dispute;',
        'Timber harvested from strictly conserved forests or forests at risk of being threatened by management activities;',
        'Timber harvested from natural forests that are being converted into plantations or other uses;',
        'Timber harvested from genetically modified plants;',
        "Materials that violate the International Labour Organization's Conventions on workers' rights.",
      ],
    },
    {
      heading: '2. Manufacturing Control and Quality Control Policies',
      paragraphs: [
        "The Company applies the 5S Program to its production system and product management, and complies strictly with manufacturing processes so as to achieve the best product quality and satisfy customers' requirements.",
      ],
    },
  ],
  certHeading: 'Certificates of FSC FM, FSC CW/COC & PEFC',
  certificates: [
    { title: 'FSC FM — Thanh Hoa (2023–2028)' },
    { title: 'FSC CW/COC — THC 2025' },
    { title: 'PEFC COC — Dai Duong' },
    { title: 'FSC COC with CW — Dai Duong Forest Products JSC' },
    { title: 'Company Information' },
  ],
};

const VI: QualityContent = {
  breadcrumbHome: 'Trang chủ',
  breadcrumbAbout: 'Giới thiệu',
  title: 'Chính sách kiểm soát chất lượng',
  blocks: [
    {
      paragraphs: [
        'Ban lãnh đạo <b>CÔNG TY TNHH THANH HÒA</b> và <b>CÔNG TY CP LÂM SẢN ĐẠI DƯƠNG</b> công bố Chính sách kiểm soát chất lượng như sau:',
      ],
    },
    {
      heading: '1. Chính sách nguyên liệu',
      paragraphs: [
        'Chúng tôi cam kết cung cấp cho khách hàng các sản phẩm được sản xuất từ nguyên liệu tuân thủ mọi yêu cầu của Chính phủ Việt Nam và Hội đồng Quản lý Rừng (FSC) về bảo vệ và phát triển tài nguyên rừng.',
        'Công ty cam kết không mua bán hoặc kinh doanh bất kỳ nguyên liệu nào từ các nguồn sau:',
      ],
      list: [
        'Gỗ khai thác trái phép;',
        'Gỗ khai thác từ khu vực vi phạm truyền thống văn hóa hoặc quyền công dân, hoặc đang tranh chấp;',
        'Gỗ khai thác từ rừng được bảo tồn nghiêm ngặt hoặc có nguy cơ bị đe dọa bởi các hoạt động quản lý;',
        'Gỗ khai thác từ rừng tự nhiên đang bị chuyển đổi sang rừng trồng hoặc mục đích sử dụng khác;',
        'Gỗ khai thác từ cây trồng biến đổi gen;',
        'Nguyên liệu vi phạm các Công ước của Tổ chức Lao động Quốc tế (ILO) về quyền của người lao động.',
      ],
    },
    {
      heading: '2. Chính sách kiểm soát sản xuất và kiểm soát chất lượng',
      paragraphs: [
        'Công ty áp dụng Chương trình 5S vào hệ thống sản xuất và quản lý sản phẩm, tuân thủ nghiêm ngặt các quy trình sản xuất nhằm đạt chất lượng sản phẩm tốt nhất và đáp ứng yêu cầu của khách hàng.',
      ],
    },
  ],
  certHeading: 'Chứng chỉ FSC FM, FSC CW/COC & PEFC',
  certificates: [
    { title: 'FSC FM — Thanh Hòa (2023–2028)' },
    { title: 'FSC CW/COC — THC 2025' },
    { title: 'PEFC COC — Đại Dương' },
    { title: 'FSC COC kèm CW — Lâm sản Đại Dương' },
    { title: 'Thông tin công ty' },
  ],
};

export function qualityContent(locale: string): QualityContent {
  return locale.startsWith('vi') ? VI : EN;
}
