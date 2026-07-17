import { type IconName } from '../icon/icon.component';

// Content model for a product-detail page (Wood Chips, Wood Pellets, Timber, Afforestation,
// Transportation). Per-page content is code-owned bilingual (selected by LOCALE_ID in the
// page's *-content.data.ts), mirroring the About-section pages. The structural chrome
// (section headings, anchor-nav, the Need-Quotation card) is shared and lives in
// `productChrome(locale)` below so it is not repeated in every page's data file.

export interface ProductBadge {
  readonly icon: IconName;
  readonly label: string;
}

export interface ProductSpec {
  readonly label: string;
  readonly value: string;
}

export interface ProductCard {
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
}

export interface ProductApplicationCard {
  readonly icon: IconName;
  readonly title: string;
  readonly description?: string;
  readonly details?: readonly string[];
}

export interface ProductProcess {
  readonly steps: readonly string[];
  readonly note: string;
}

export interface ProductLine {
  readonly title: string;
  readonly description?: string;
  readonly details: readonly string[];
}

export interface ProductGalleryImage {
  readonly src: string;
  readonly alt: string;
}

export interface ProductCommitment {
  readonly intro: string;
  readonly details: readonly string[];
}

export interface ProductSectionCopy {
  readonly heading?: string;
  readonly navigation?: string;
}

export interface ProductFaq {
  readonly question: string;
  readonly answer: string;
}

export interface ProductContent {
  /** Product name - the last breadcrumb crumb and the sidebar anchor-nav card title. */
  readonly name: string;
  /** Banner H1. */
  readonly title: string;
  /** Banner intro paragraph. */
  readonly intro: string;
  /** Hero image URL; null shows the shared neutral placeholder. */
  readonly bannerImage: string | null;
  readonly bannerAlt: string;
  /** Three trust badges shown under the banner intro. */
  readonly badges: readonly ProductBadge[];

  readonly overview: readonly string[];
  /** Supporting overview image; null omits the image without reserving empty space. */
  readonly overviewImage: string | null;
  readonly overviewImageAlt: string;

  readonly specs: readonly ProductSpec[];

  /** Optional extended sections used by content-rich product pages. */
  readonly advantages?: readonly string[];
  readonly productionProcess?: ProductProcess;
  readonly productLinesIntro?: string;
  readonly productLines?: readonly ProductLine[];
  readonly qualityCommitment?: ProductCommitment;
  readonly gallery?: readonly ProductGalleryImage[];

  /** Overrides the default sidebar order when a page enables extended sections. */
  readonly sectionOrder?: readonly ProductSectionId[];
  /** Optional per-page copy overrides without coupling the shared shell to a product. */
  readonly sectionCopy?: Readonly<Partial<Record<ProductSectionId, ProductSectionCopy>>>;

  /** Moves specifications out of the overview when a richer layout needs them elsewhere. */
  readonly specsPlacement?: 'overview' | 'advantage';

  readonly applicationsIntro: string;
  readonly applications: readonly ProductApplicationCard[];
  /** Optional card-grid override; the shared three-column layout remains the default. */
  readonly applicationColumns?: 2 | 3;
  /** Number of leading application cards promoted to half-width on larger screens. */
  readonly applicationFeaturedCount?: number;

  readonly whyChoose: readonly ProductCard[];

  readonly videoEyebrow: string;
  readonly videoTitle: string;
  readonly videoParagraphs: readonly string[];
  /** Embedded video URL; null → a placeholder thumbnail with a play affordance is shown. */
  readonly videoUrl: string | null;
  readonly videoThumbnail: string | null;

  readonly faqs: readonly ProductFaq[];
}

export interface AnchorNavItem {
  /** In-page section id this item scrolls to. */
  readonly id: string;
  readonly label: string;
}

export type ProductSectionId =
  | 'overview'
  | 'specifications'
  | 'advantage'
  | 'production-process'
  | 'products'
  | 'applications'
  | 'quality-commitment'
  | 'pictures'
  | 'why-choose-us'
  | 'video'
  | 'faqs';

export const DEFAULT_PRODUCT_SECTION_ORDER = [
  'overview',
  'specifications',
  'applications',
  'why-choose-us',
  'video',
  'faqs',
] as const satisfies readonly ProductSectionId[];

export interface ProductChrome {
  readonly breadcrumbHome: string;
  readonly breadcrumbProducts: string;
  readonly overviewHeading: string;
  readonly specsHeading: string;
  readonly advantageHeading: string;
  readonly productionProcessHeading: string;
  readonly productsHeading: string;
  readonly applicationsHeading: string;
  readonly qualityCommitmentHeading: string;
  readonly picturesHeading: string;
  readonly whyChooseHeading: string;
  readonly videoHeading: string;
  readonly faqHeading: string;
  readonly sectionLabels: Readonly<Record<ProductSectionId, string>>;
  readonly quotationHeading: string;
  readonly quotationBody: string;
  readonly quotationButton: string;
}

const EN: ProductChrome = {
  breadcrumbHome: 'Homepage',
  breadcrumbProducts: 'Products & Services',
  overviewHeading: 'Product Overview',
  specsHeading: 'Specifications',
  advantageHeading: 'Advantage',
  productionProcessHeading: 'Production Process',
  productsHeading: 'Products',
  applicationsHeading: 'Applications',
  qualityCommitmentHeading: 'Quality Commitment',
  picturesHeading: 'Pictures',
  whyChooseHeading: 'Why Choose Us',
  videoHeading: 'Video',
  faqHeading: 'FAQ',
  sectionLabels: {
    overview: 'Product overview',
    specifications: 'Specifications',
    advantage: 'Advantage',
    'production-process': 'Production process',
    products: 'Products',
    applications: 'Applications',
    'quality-commitment': 'Quality commitment',
    pictures: 'Pictures',
    'why-choose-us': 'Why choose us',
    video: 'Video',
    faqs: 'FAQ',
  },
  quotationHeading: 'Need Quotation?',
  quotationBody: 'Let us know your requirements, we will get back to you soon.',
  quotationButton: 'Get a quote',
};

const VI: ProductChrome = {
  breadcrumbHome: 'Trang chủ',
  breadcrumbProducts: 'Sản phẩm & Dịch vụ',
  overviewHeading: 'Tổng quan sản phẩm',
  specsHeading: 'Thông số kỹ thuật',
  advantageHeading: 'Ưu điểm nổi bật',
  productionProcessHeading: 'Quy trình sản xuất',
  productsHeading: 'Các sản phẩm',
  applicationsHeading: 'Ứng dụng',
  qualityCommitmentHeading: 'Cam kết chất lượng',
  picturesHeading: 'Một số hình ảnh',
  whyChooseHeading: 'Vì sao chọn chúng tôi',
  videoHeading: 'Video',
  faqHeading: 'Câu hỏi thường gặp',
  sectionLabels: {
    overview: 'Tổng quan sản phẩm',
    specifications: 'Thông số kỹ thuật',
    advantage: 'Ưu điểm nổi bật',
    'production-process': 'Quy trình sản xuất',
    products: 'Các sản phẩm',
    applications: 'Ứng dụng',
    'quality-commitment': 'Cam kết chất lượng',
    pictures: 'Hình ảnh',
    'why-choose-us': 'Vì sao chọn chúng tôi',
    video: 'Video',
    faqs: 'Câu hỏi thường gặp',
  },
  quotationHeading: 'Cần báo giá?',
  quotationBody: 'Hãy cho chúng tôi biết yêu cầu của bạn, chúng tôi sẽ phản hồi sớm.',
  quotationButton: 'Nhận báo giá',
};

export function productChrome(locale: string): ProductChrome {
  return locale.startsWith('vi') ? VI : EN;
}

// Turn any YouTube watch / share / shorts / embed link into a privacy-friendly embed URL so it
// can be dropped straight into an <iframe>. A non-YouTube URL is returned unchanged (assumed
// already embeddable); empty input returns null. To show a video on a product page, just set
// `videoUrl` in its *-content.data.ts to a normal YouTube link - the player appears automatically.
export function videoEmbedUrl(url: string | null): string | null {
  if (!url) {
    return null;
  }

  const match = url.match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([A-Za-z0-9_-]{11})/,
  );

  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : url;
}
