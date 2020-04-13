<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wpAPI2' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'o8{I(,ZEqn3u)xe7b]yf3q}8mHTS>*V0HUzlS~,*7^tl|i90|.MHllvjO8abw cx' );
define( 'SECURE_AUTH_KEY',  'pjwlAb]PUfG*$.h.&Av?|$m7L$U8}##uzH<HRbdd[3URX~7gCPfVr=je3Q%CrC`@' );
define( 'LOGGED_IN_KEY',    'zaQ5TJ?G<j!K3jQ$Vkl[W~uq4HSr1<S4e^(rS)`rGtx8HD^n71tS<;LmdMpq91iU' );
define( 'NONCE_KEY',        'I]WZ{F?c2`73sQI7-/^&X1eG|wxbb+cT8v6f2<VJloSxc!:q&H@>gQ;~Nd8D+Uc$' );
define( 'AUTH_SALT',        'r&wLCkEOp15+6SR2B-q)NKJkCn|L%#nPlUSn=*!_pp<np+#hHX2rt2TFCneTfQ/^' );
define( 'SECURE_AUTH_SALT', '08dc#mD!4s]CF{-MFc&Glj{Ao=X]ze::y9K$?Fo$wD5%h|+U7B}R?z}!O!Ag9&wT' );
define( 'LOGGED_IN_SALT',   '7j),@HG:fv!Bltpjlq14V*|,-^>04I;MN$<?Md!YB;DW2!i]2W;0`7gmbXN@3+U.' );
define( 'NONCE_SALT',       'vX7i5m=*?m+R<x-5&>h`)9^dr,HXX-A&mF~us^>{4b.-zxysLR+lH0)el}{ )UGL' );

// JWT Settings
define('JWT_AUTH_SECRET_KEY', 'JOppm5tI(mTFa{Cl*+|gt|(A3}fZgo(!l%WY`-lg)I|K<>.fZJsmKiG|]l?gwE7|');

// Allow Cross-Origin Resource Sharing
define('JWT_AUTH_CORS_ENABLE', true);

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpAPI2_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
