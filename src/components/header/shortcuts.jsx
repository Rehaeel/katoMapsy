import shortcuts from '../icons/keyboard.svg';
import enter from '../icons/enter-grayed.svg';

const Shortcuts = ({ styles }) => (
	<div className={styles.shortcuts}>
		<img src={shortcuts} alt='keyboard shortcuts' />
		<ul>
			<h3>Skróty klawiszowe</h3>
			<li>
				<span>
					[<b> / </b>]
				</span>{' '}
				wyszukaj kościół - skrót do rozpoczęcia wyszukiwania
			</li>
			<li>
				<span>
					[<b>esc</b>]
				</span>{' '}
				wyłącz formularz - powrót do listy kościołów
			</li>
			<li>
				<span>
					[<b>esc</b>]
				</span>{' '}
				wyłącz popup z filmikiem instruktarzowym
			</li>

			<li>
				<span>
					[<img src={enter} alt='dodaj kościół' />]
				</span>{' '}
				dodaj kościół - włącza formularz dodawania nowego kościoła
			</li>
			<li>
				<span>
					[<b>alt+t</b>]
				</span>{' '}
				zaznaczenie przeskakuje na pierwszą rubrykę w sekcji dodawania
				godzin w formularzu
			</li>
			<li>
				<span>
					[<b>alt+q</b>]
				</span>{' '}
				dodanie godzin z formularza godzin
			</li>
			<li>
				<span>
					[<b>alt+a</b>]
				</span>{' '}
				dodanie kościoła w formularzu
			</li>
		</ul>
	</div>
);

export default Shortcuts;
