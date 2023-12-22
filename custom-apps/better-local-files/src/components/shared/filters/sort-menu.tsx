import styles from '../../../css/app.module.scss';
import React from 'react';
import { CaretDown } from '../icons/caret-down';
import type {
    SelectedSortOption,
    SortOption,
} from 'custom-apps/better-local-files/src/models/sort-option';
import { SPOTIFY_MENU_CLASSES } from 'custom-apps/better-local-files/src/constants/constants';
import type { HeaderKey } from 'custom-apps/better-local-files/src/constants/constants';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { getTranslation } from 'custom-apps/better-local-files/src/helpers/translations-helper';

export type Props = {
    sortOptions: SortOption[];
    selectedSortOption: SelectedSortOption;
    setSelectedSortOption: (key: HeaderKey) => void;
};

export function SortMenu(props: Readonly<Props>): JSX.Element {
    const menu = (
        <Spicetify.ReactComponent.Menu className={SPOTIFY_MENU_CLASSES}>
            <li>
                <span
                    className={`${styles['sort-menu-header']} main-contextMenu-menuHeading ellipsis-one-line`}
                    dir="auto"
                >
                    {getTranslation(['drop_down.sort_by'])}
                </span>
            </li>

            {props.sortOptions.map((o) => (
                <Spicetify.ReactComponent.MenuItem
                    key={o.key}
                    onClick={() => {
                        props.setSelectedSortOption(o.key);
                    }}
                >
                    <div className={`${styles['sort-menu-item']}`}>
                        <span>{o.label}</span>
                        {props.selectedSortOption.key === o.key &&
                            (props.selectedSortOption.order === 'ascending' ? (
                                <ArrowUp
                                    className={`${styles['sort-menu-caret']}`}
                                />
                            ) : (
                                <ArrowDown
                                    className={`${styles['sort-menu-caret']}`}
                                />
                            ))}
                    </div>
                </Spicetify.ReactComponent.MenuItem>
            ))}
        </Spicetify.ReactComponent.Menu>
    );

    return (
        <Spicetify.ReactComponent.ContextMenu
            trigger="click"
            action="toggle"
            menu={menu}
        >
            <button
                className="x-sortBox-sortDropdown"
                type="button"
                aria-expanded="false"
            >
                <span>
                    {props.sortOptions.find(
                        (o) => o.key === props.selectedSortOption.key,
                    )?.label ?? ''}
                </span>
                <CaretDown />
            </button>
        </Spicetify.ReactComponent.ContextMenu>
    );
}
