import { useLanguage } from '../../../i18n/LanguageContext'

export default function CategoryChips({ categories, active, onChange }) {
  const { t, lang } = useLanguage()

  const options = [{ slug: null, label: t.blog.allCategories }, ...categories.map((category) => ({
    slug: category.slug,
    label: category.label[lang] ?? category.label.pt,
  }))]

  return (
    <div
      role="tablist"
      aria-label={t.blog.latest}
      className="flex flex-wrap gap-2"
    >
      {options.map((option) => {
        const selected = option.slug === active
        return (
          <button
            key={option.slug ?? 'all'}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.slug)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/70 ${
              selected
                ? 'border-brand-orange bg-brand-orange/10 text-brand-orange'
                : 'border-line text-mist hover:border-brand-orange/50 hover:text-fg'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
