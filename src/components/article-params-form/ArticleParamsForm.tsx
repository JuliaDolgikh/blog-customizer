import { useRef, useState } from 'react';
import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  ArticleStateType,
} from 'src/constants/articleProps';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({
  onApply,
}: {
  onApply: (state: ArticleStateType) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState(defaultArticleState);

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen,
    onChange: setIsOpen,
    onClose: () => setIsOpen(false),
    rootRef: ref,
  });

  const handleApply = () => {
    onApply(formState);
    setIsOpen(false);
  };

  const handleReset = () => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
    setIsOpen(false);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <aside ref={ref} className={`${styles.container} ${styles.container_open}`}>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              handleApply();
            }}
          >
			  <h2 className={styles.title}>Задайте параметры</h2>

            <Select
              title="Шрифт"
              options={fontFamilyOptions}
              selected={formState.fontFamilyOption}
              onChange={(val) => setFormState((prev) => ({ ...prev, fontFamilyOption: val }))}
            />

            <RadioGroup
              name="font-size"
              title="Размер"
              options={fontSizeOptions}
              selected={formState.fontSizeOption}
              onChange={(val) => setFormState((prev) => ({ ...prev, fontSizeOption: val }))}
            />

            <Select
              title="Цвет шрифта"
              options={fontColors}
              selected={formState.fontColor}
              onChange={(val) => setFormState((prev) => ({ ...prev, fontColor: val }))}
            />

            <Select
              title="Цвет фона"
              options={backgroundColors}
              selected={formState.backgroundColor}
              onChange={(val) => setFormState((prev) => ({ ...prev, backgroundColor: val }))}
            />

            <Select
              title="Ширина контента"
              options={contentWidthArr}
              selected={formState.contentWidth}
              onChange={(val) => setFormState((prev) => ({ ...prev, contentWidth: val }))}
            />

            <div className={styles.bottomContainer}>
              <Button title="Сбросить" type="clear" onClick={handleReset} />
              <Button title="Применить" htmlType="submit" type="apply" />
            </div>
          </form>
        </aside>
      )}
    </>
  );
};
