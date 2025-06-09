import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

import styles from './ArticleParamsForm.module.scss';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	contentWidthArr,
	fontColors,
	backgroundColors,
} from 'src/constants/articleProps';

export const ArticleParamsForm = ({
	isOpen,
	onClose,
	formState,
	setFormState,
	onApply,
	onReset,
}: {
	isOpen: boolean;
	onClose: () => void;
	formState: typeof defaultArticleState;
	setFormState: React.Dispatch<React.SetStateAction<typeof defaultArticleState>>;
	onApply: () => void;
	onReset: () => void;
}) => {
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onClose} />
			{isOpen && (
				<aside className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
					<form
						className={styles.form}
						onSubmit={(e) => {
							e.preventDefault();
							onApply();
						}}
					>
						{}
						<Select
							title="Шрифт"
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={(val) =>
								setFormState((prev) => ({ ...prev, fontFamilyOption: val }))
							}
						/>

						{}
						<RadioGroup
							name="font-size"
							title="Размер"
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(val) =>
								setFormState((prev) => ({ ...prev, fontSizeOption: val }))
							}
						/>

						{}
						<div className={styles.section}>
							<Select
								title="Цвет шрифта"
								options={fontColors}
								selected={formState.fontColor}
								onChange={(val) =>
									setFormState((prev) => ({ ...prev, fontColor: val }))
								}
							/>
						</div>

						{}
						<div className={`${styles.section} ${styles.largeGapTop}`}>
							<Select
								title="Цвет фона"
								options={backgroundColors}
								selected={formState.backgroundColor}
								onChange={(val) =>
									setFormState((prev) => ({ ...prev, backgroundColor: val }))
								}
							/>
						</div>

						{}
						<div className={`${styles.section} ${styles.hugeGapBottom}`}>
							<Select
								title="Ширина контента"
								options={contentWidthArr}
								selected={formState.contentWidth}
								onChange={(val) =>
									setFormState((prev) => ({ ...prev, contentWidth: val }))
								}
							/>
						</div>

						{/* Кнопки */}
						<div className={styles.bottomContainer}>
							<Button title="Сбросить" type="clear" onClick={onReset} />
							<Button title="Применить" htmlType="submit" type="apply" />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
